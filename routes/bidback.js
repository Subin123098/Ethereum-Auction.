var express = require('express');
var router = express.Router();
var Web3 = require("web3");
const web3 = new Web3('http://localhost:8545');

router.post('/', function (req, res, next) {
  reqData = req.body;
  console.log(reqData);
  address = reqData.Address;
  console.log(address);
  auc.methods.getAmount().send({ from: address, gas: 1500000 }).on('transactionHash', (hash) => {

    
    res.send("Your amount is successfully credited in your account")
  }).on('error', (error) => {
    console.log(error.message);
    res.send("Your action is not valid")
  });
});
module.exports = router;

