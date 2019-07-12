var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    reqData = req.body;
    console.log(reqData);
    address = reqData.bids;
    console.log(address)
    eth_amount = req.body.e;
    console.log(eth_amount)



    auc.methods.bid().send({ from: address, gas: 6000000, value: web3.utils.toWei(eth_amount, 'ether') }).on('transactionHash', (hash) => {
          res.send("Bidding is Successful !")

         

          
    }).on('error', (error) => {
          console.log(error.message);
          res.send("Bidding is not Successful !, Check your action is valid or not!!!")
    })
});






module.exports=router;