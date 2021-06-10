pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;

import "./IERC721.sol";
import "./IERC721Receiver.sol";

contract PiggyContract is IERC721 {

    string public override constant name = "Piggy";
    string public override constant symbol = "PGY";
    uint256 public constant CREATION_LIMIT_GEN0 = 10;
    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

    /**
     *  bytes4(keccak256('balanceOf(address)')) == 0x70a08231
     *  bytes4(keccak256('ownerOf(uint256)')) == 0x6352211e
     *  bytes4(keccak256('approve(address, uint256)')) == 0x095ea7b3
     *  bytes4(keccak256('getApproved(uint256)')) == 0x081812fc
     *  bytes4(keccak256('setApprovalForAll(address, bool)')) == 0xa22cb465
     *  bytes4(keccak256('isApprovedForAll(address, address)')) == 0xe985e9c5
     *  bytes4(keccak256('transferFrom(address, address, uint256)')) == 0x23b872dd
     *  bytes4(keccak256('safeTransferFrom(address, address, uint256)')) == 0x42842e0e
     *  bytes4(keccak256('safeTransferFrom(address, address, uint256, bytes)')) == 0xb88d4fde
     *  
     *  => 0x70a08231 ^ 0x6352211e ^ 0x095ea7b3 ^ 0x081812fc ^
     *     0xa22cb465 ^ 0xe985e9c5 ^ 0x23b872dd ^ 0x42842e0e ^ 0xb88d4fde == 0x80ac58cd
     */
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;

    /**
     *  bytes4(keccak256('supportsInterface(bytes4)'));
    */
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    struct Piggy {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint256 generation;
        uint256 id;
    }

    Piggy[] private piggies;

    uint256 public gen0Counter;
    
    mapping(uint256 => address) private piggyIndexOwner;
    mapping(address => uint256) private ownershipTokenCount;
    mapping(uint256 => address) private piggyIndexToApproved;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event Birth(address owner, uint256 piggyId, uint256 mumId, uint256 dadId, uint256 genes);

    constructor() {
        _createPiggy(0, 0, 0, uint256(0), address(0));
    }

    function createPiggyGen0(uint256 _genes) public {
        require(gen0Counter < CREATION_LIMIT_GEN0);

        gen0Counter++;

        // Gen0 have no owners they are own by the contract
        _createPiggy(uint32(0), uint32(0), uint16(0), _genes, msg.sender);
    }

    function _createPiggy(
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) private returns (uint256) {
        uint256 newPiggyId = piggies.length;
        Piggy memory _piggy = Piggy ({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation),
            id: newPiggyId
        });

        piggies.push(_piggy);

        emit Birth(_owner, newPiggyId, _mumId, _dadId, _genes);

        _transfer(address(0), _owner, newPiggyId);

        return newPiggyId;
    }

    function getPiggies() external view returns (Piggy[] memory) {
        Piggy[] memory piggyList = new Piggy[](piggies.length);
        uint piggiesLength = 0;

        for(uint i = 0; i < piggies.length; i++) {

            if (piggyIndexOwner[i] == msg.sender) {
                piggyList[piggiesLength] = piggies[i];
                piggiesLength++;
            }

        }

        return piggyList;
    }

    function breed(uint256 _dadId, uint256 _mumId) public returns (uint256) {
        require(_dadId < piggies.length);
        require(_mumId < piggies.length);
        require(piggyIndexOwner[_dadId] == msg.sender, "User does not own token");
        require(piggyIndexOwner[_mumId] == msg.sender, "User does not own token");

        (uint256 dadDna,,,, uint256 dadGeneration,) = getPiggy(_dadId);
        (uint256 mumDna,,,, uint256 mumGeneration,) = getPiggy(_mumId);

        uint256 newDna = _mixDna(dadDna, mumDna);

        uint256 generation;
        if (dadGeneration > mumGeneration) {
            generation = dadGeneration + 1;
        }
        else {
            generation = mumGeneration + 1;
        }

        return _createPiggy(uint32(_mumId), uint32(_dadId), uint16(generation), newDna, msg.sender);
    }

    /*
    function _mixDna(uint256 _dadId, uint256 _momId) internal pure returns (uint256) {
        // Dad DNA: 11 22 33 44 55 66 77 88
        // Mum DNA: 88 77 66 55 44 33 22 11

        uint256 firstHalf =_dadId / 100000000; // 11 22 33 44
        uint256 secondHalf =_momId % 100000000;// 44 33 22 11

        uint256 newDna = firstHalf * 100000000;
        newDna = newDna + secondHalf;

        return newDna;
    }
    */

    function _mixDna(uint256 _dadDna, uint256 _mumDna) internal view returns (uint256) {
        uint256[8] memory geneArray;
        uint8 random = uint8(block.timestamp % 255); //0-255   00000000-11111111
        uint256 index = 7;

        for (uint256 i = 1; i <= 128 && index > 0; i*=2) {
            if (random & i != 0) { // use bit wise to check which DNA element use
                geneArray[index] = uint8(_mumDna % 100); // set the last element of the new DNA with mum DNA
            }
            else {
                geneArray[index] = uint8(_dadDna % 100); // set the last element of the new DNA with dad DNA
            }

            // remove last element of DNA
            _mumDna /= 100;
            _dadDna /= 100;

            index--;
        }

        uint256 newGene;
        //[11, 22, 33, 44, 55, 66, 77, 88]
        //1122334455667788
        for (uint256 i = 0; i < 8; i++) {
            newGene += geneArray[i];

            if (i != 7) {
                newGene *= 100;
            }
        }

        return newGene;
    }

    function balanceOf(address owner) external override view returns (uint256 balance) {
        return ownershipTokenCount[owner];
    }

    function totalSupply() external override view returns (uint256 total) {
        return piggies.length;
    }

    function ownerOf(uint256 tokenId) external override view returns (address owner) {
        return piggyIndexOwner[tokenId];
    }

    function transfer(address to, uint256 tokenId) external override {
        require(to != address(0)); // non zero address
        require(to != address(this)); // not sending to the owner
        require(_ows(msg.sender, tokenId)); // currenct address is the owner of the token

        _transfer(msg.sender, to, tokenId);
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownershipTokenCount[_to]++;
        piggyIndexOwner[_tokenId] = _to;

        if (_from != address(0)) {
            ownershipTokenCount[_from]--;
            delete piggyIndexToApproved[_tokenId];
        }
        
        emit Transfer(_from, _to, _tokenId);
    }

    function _ows(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return piggyIndexOwner[_tokenId] == _claimant;
    }

    function getPiggy(uint256 piggyId) public view returns (
        uint256 genes,
        uint256 birthTime, // use uint265 because is easier to read in the frontend than smaller values
        uint256 mumId,
        uint256 dadId,
        uint256 generation,
        address owner
    )
    {
        Piggy storage _piggy = piggies[piggyId]; // user storage instead memory to use a pointer, instead copy everything to memory

        genes = _piggy.genes;
        birthTime = uint256(_piggy.birthTime);
        mumId = uint256(_piggy.mumId);
        dadId = uint256(_piggy.dadId);
        generation = uint256(_piggy.generation);
        owner = piggyIndexOwner[piggyId];
    }

    function approve(address _approved, uint256 _tokenId) external override payable {
        require(_approved != address(0), "No address to be approved");
        require(_ows(msg.sender, _tokenId), "Address is not authorized to do approvals");

        _approve(_approved, _tokenId);
        emit Approval(piggyIndexOwner[_tokenId], _approved, _tokenId);
    }

    function _approve(address _approved, uint256 _tokenId) private {
        piggyIndexToApproved[_tokenId] = _approved;
    }

    function setApprovalForAll(address _operator, bool _approved) external override {
        require(_operator != address(0), "No address to be approved");
        require(msg.sender != _operator , "Owner can't be an operator");

        _setApprovalForAll(_operator, _approved);
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function _setApprovalForAll(address _operator, bool _approved) private {
        _operatorApprovals[msg.sender][_operator] = _approved;
    }

    /// @notice Get the approved address for a single NFT
    /// @dev Throws if `_tokenId` is not a valid NFT.
    /// @param _tokenId The NFT to find the approved address for
    /// @return The approved address for this NFT, or the zero address if there is none
    function getApproved(uint256 _tokenId) external override view returns (address) {
        require(_tokenId < piggies.length, "Token ID is not valid");

        return piggyIndexToApproved[_tokenId];
    }

    /// @notice Query if an address is an authorized operator for another address
    /// @param _owner The address that owns the NFTs
    /// @param _operator The address that acts on behalf of the owner
    /// @return True if `_operator` is an approved operator for `_owner`, false otherwise
    function isApprovedForAll(address _owner, address _operator) public override view returns (bool) {
        return _operatorApprovals[_owner][_operator];
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external override payable {
        require(_to != address(0)); // non zero address

        address owner = piggyIndexOwner[_tokenId];
        require(_to != owner); // not sending to the owner
        require(msg.sender == _from || approvedFor(msg.sender, _tokenId) || isApprovedForAll(owner, msg.sender)); // currenct address is the owner of the token
        require(_ows(_from, _tokenId), "From is not the owner of the token");
        require(_tokenId < piggies.length, "Token ID is not valid");

        _transfer(_from, _to, _tokenId);
    }

    function approvedFor(address claimaint, uint256 tokenId) private view returns (bool) {
        return piggyIndexToApproved[tokenId] == claimaint;
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory data) public override payable {
        require(_isAapprovedOrOwner(msg.sender, _from, _to, _tokenId));
        
        _safeTransfer(_from, _to, _tokenId, data);
    }

    function _isAapprovedOrOwner(address _spender, address _from, address _to, uint256 _tokenId) private view returns (bool) {
        require(_tokenId < piggies.length, "Token ID is not valid"); // token must exist
        require(_to != address(0)); // non zero address

        address owner = piggyIndexOwner[_tokenId];
        require(_to != owner); // not sending to the owner
        require(_ows(_from, _tokenId), "From is not the owner of the token"); // check if from is the owner
        
        // spender is from OR spender is approved for tokenId OR spender is operator for from
        return (_spender == _from || approvedFor(_spender, _tokenId) || isApprovedForAll(owner, _spender)); // currenct address is the owner of the token
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external override payable {
        safeTransferFrom(_from, _to, _tokenId, "");
    }

    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, _data));
    }

    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns (bool) {
        if (!_isContract(_to)) {
            return true;
        }

        // Call onERC721Received in the _to contract
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
        return returnData == MAGIC_ERC721_RECEIVED;
        
        // Check return value

    }

    function _isContract(address _to) internal view returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(_to)
        }
        return size > 0;
    }

    function supportsInterface(bytes4 _interfaceId) external pure returns (bool) {
        return (_interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165);
    }

}