pragma solidity ^0.8.4;

contract Ownable {
    address owner;
    
    modifier onlyOnwer {
        require(msg.sender == owner);
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
}
