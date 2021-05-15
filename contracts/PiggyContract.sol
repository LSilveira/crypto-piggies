pragma solidity ^0.8.4;

import "./IERC721.sol";

contract PiggyContract is IERC721 {

    string public override constant name = "Piggy";
    string public override constant symbol = "PGY";
    uint256 public constant CREATION_LIMIT_GEN0 = 10;

    struct Piggy {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint256 generation;
    }

    Piggy[] private piggies;

    uint256 public gen0Counter;
    
    mapping(uint256 => address) private piggyIndexOwner;
    mapping(address => uint256) private ownershipTokenCount;

    event Birth(address owner, uint256 piggyId, uint256 mumId, uint256 dadId, uint256 genes);

    function createPiggyGen0(uint256 _genes) public {
        require(gen0Counter < CREATION_LIMIT_GEN0);

        gen0Counter++;

        // Gen0 have no owners they are own by the contract
        _createPiggy(uint32(0), uint32(0), uint16(0),  _genes, msg.sender);
    }

    function _createPiggy(
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) private returns (uint256) {
        Piggy memory _piggy = Piggy ({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });

        piggies.push(_piggy);
        uint256 newPiggyId = piggies.length -1;

        emit Birth(_owner, newPiggyId, _mumId, _dadId, _genes);

        _transfer(address(0), _owner, newPiggyId);

        return newPiggyId;
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
        }
        
        emit Transfer(_from, _to, _tokenId);
    }

    function _ows(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return piggyIndexOwner[_tokenId] == _claimant;
    }

    function getPiggy(uint256 piggyId) external view returns (
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

}