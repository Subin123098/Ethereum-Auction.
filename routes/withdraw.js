var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
  reqData = req.body;
  console.log(reqData);
  address_Current = reqData.AddressList;
  console.log(address_Current)

  auc.methods.withdraw().send({ from: address_Current, gas: 1500000 }).on('transactionHash', (hash) => {

    res.send("Bid value is successfully credited in Owner account");
   
  }).on('error', (error) => {
    console.log(error.message);
    res.send("This action only allowed for contract owner after Auction time")

  });
    
});

module.exports = router;