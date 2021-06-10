pragma solidity ^0.8.4;

import "./PiggyContract.sol";
import "./Ownable.sol";
import "./IPiggyMarketPlace.sol";

contract PiggyMarketPlace is Ownable, IPiggyMarketPlace {
    PiggyContract private _piggyContract;

    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

    Offer[] offers;

    mapping(uint256 => Offer) tokenIdToOffer;

    constructor(address _piggyContractAddress) {
        setPiggyContract(_piggyContractAddress);
    }

    /**
    * Set the current PiggyContract address and initialize the instance of Piggycontract.
    * Requirement: Only the contract owner can call.
     */
    function setPiggyContract(address _piggyContractAddress) public override onlyOwner {
        _piggyContract = PiggyContract(_piggyContractAddress);
    }

    /**
    * Get the details about a offer for _tokenId. Throws an error if there is no active offer for _tokenId.
     */
    function getOffer(uint256 _tokenId) public override view
    returns (
        address seller,
        uint256 price,
        uint256 index,
        uint256 tokenId,
        bool active
    ) {
        Offer storage offer = tokenIdToOffer[_tokenId];
        //require(offer.active != false, "There is no active offer");

        return (
            offer.seller,
            offer.price,
            offer.index,
            offer.tokenId,
            offer.active
        );
    }

    /**
    * Get all tokenId's that are currently for sale. Returns an empty arror if none exist.
     */
    function getAllTokenOnSale() public override view returns(uint256[] memory listOfOffers) {
        require(offers.length != 0, "There are no offers!");
        
        listOfOffers = new uint256[](offers.length);
        for (uint256 i = 0; i < offers.length; i++) {
            if (offers[i].active) {
                listOfOffers[listOfOffers.length] = offers[i].tokenId;
            }
        }
    }

    function _owsPiggy(address _address, uint256 _tokenId) internal view returns(bool) {
        return _piggyContract.ownerOf(_tokenId) == _address;
    }

    /**
    * Creates a new offer for _tokenId for the price _price.
    * Emits the MarketTransaction event with txType "Create offer"
    * Requirement: Only the owner of _tokenId can create an offer.
    * Requirement: There can only be one active offer for a token at a time.
    * Requirement: Marketplace contract (this) needs to be an approved operator when the offer is created.
     */
    function setOffer(uint256 _price, uint256 _tokenId) public override {
        require(
            _owsPiggy(msg.sender, _tokenId),
            "Only token owner can create offers!"
        );
        require(
            tokenIdToOffer[_tokenId].active != true,
            "Each token can only have one active offer"
        );
        require(
            _piggyContract.isApprovedForAll(msg.sender, address(this)),
            "Marketplace contract needs to be approved to managed token on owner behalve!"
        );

        Offer memory _offer = Offer({
            seller: payable(msg.sender),
            price: _price,
            index: offers.length,
            tokenId: _tokenId,
            active: true
        });
        tokenIdToOffer[_tokenId] = _offer;
        offers.push(_offer);

        emit MarketTransaction("Create offer", msg.sender, _tokenId);
    }

    /**
    * Removes an existing offer.
    * Emits the MarketTransaction event with txType "Remove offer"
    * Requirement: Only the seller of _tokenId can remove an offer.
     */
    function removeOffer(uint256 _tokenId) public override {
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(offer.seller == msg.sender, "Only token owner can remove offer!");
        //require(_piggyContract.ownerOf(_tokenId) == msg.sender, "Only token owner can remove offer!"); --> using an external contract might use more gas

        delete tokenIdToOffer[_tokenId];
        offers[offer.index].active = false;

        emit MarketTransaction("Remove offer", msg.sender, _tokenId);
    }

    /**
    * Executes the purchase of _tokenId.
    * Sends the funds to the seller and transfers the token using transferFrom in Piggycontract.
    * Emits the MarketTransaction event with txType "Buy".
    * Requirement: The msg.value needs to equal the price of _tokenId
    * Requirement: There must be an active offer for _tokenId
     */
    function buyPiggy(uint256 _tokenId) public override payable {
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(offer.price == msg.value, "Not enough funds to buy!");
        require(offer.active == true, "Offer is no longer active!");

        // delete token from the mapping before transfer to avoid reentry attack
        delete tokenIdToOffer[_tokenId];
        offers[offer.index].active = false;

        // transfer funds to the seller
        // TODO: make this logic pull instead push. pull is more secure and save some gas
        if (offer.price > 0) {
            offer.seller.transfer(offer.price); // push
        }

        // transfer ownership of the piggy
        _piggyContract.transferFrom(offer.seller, msg.sender, _tokenId);

        emit MarketTransaction("Buy", msg.sender, _tokenId);
    }
}