var web3 = new Web3(Web3.givenProvider); // url for the network. givenProvider will use the provider metamask sends

var instance;
var user;
var contractAddress = "0x61FB7AEd5350F3C9EF43CB087C6dcb6ABedA57e8";

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts) {
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];

        console.log(instance);
    })
})

function createPig() {
    var dnaStr = getDna();
    instance.methods.createPiggyGen0(dnaStr).send({}, function(error, txHash) {
        if(error)
            console.log(error);
        else
            console.log(txHash);
    })
}