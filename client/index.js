var web3 = new Web3(Web3.givenProvider); // url for the network. givenProvider will use the provider metamask sends

var instance;
var user;
var contractAddress = "0xCCad47b27a35B1B757AFb2a5a08584033200EEf7";

$(document).ready(async function() {
    if (window.ethereum) {
        window.ethereum.enable().then(function(accounts) {
            instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
            user = accounts[0];

            instance.events.Birth()
            .on("connected", function(subscriptionId){
                console.log(subscriptionId);
            })
            .on('data', function(event){
                console.log(event);
                $("#piggyCreation").css("display", "block");
                $("#piggyCreation").text('Piggy created! Piggy id: ' + event.returnValues.piggyId +
                                    ', Dad id: ' + event.returnValues.dadId +
                                    ', Mum id: ' + event.returnValues.mumId +
                                    ', Genes: ' + event.returnValues.genes +
                                    ', Owner: ' + event.returnValues.owner); // same results as the optional callback above
            })
            .on('changed', function(event){
                // remove event from local database
                console.log(event);
            })
            .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                console.log(receipt);
                console.log(error);
            })

            console.log(instance);
        })

    }
    else if (windows.web3) {
        web3 = new Web3(window.web3.currentProvider);
        let accounts = await web3.eth.getAccounts();
        user = accounts[0];
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})

        console.log("Old metamask instance");
        console.log(instance);
    }
    else {
        alert("Browser doesn't have metamask installed");
    }

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