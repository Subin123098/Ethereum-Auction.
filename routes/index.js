var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index.ejs',{title:"to home"})
//auc.web3.methods.getAuctionDetailthen(function())

  
  res.render('index', { title: 'AUCTION 2019' });
});

router.get('/home',(req,res,next)=>{
  res.render('home.ejs',{title:"to home"})

});



router.get('/products',(req,res,next)=>{
  

  web3.eth.getAccounts().then((data1) => {
    console.log(data1);
    //call getAuctionDetails from deployed contract for getting auction details
    auc.methods.getAuctionDetails().call({ from: data1[0] }).then(function (data) {
      //call Mycar from deployed contract for getting car details
      auc.methods.Mycar().call({ from: data1[0] }).then(function (car) {
        auc.methods.auction_status().call({ from: data1[0] }).then(function (state) {
          if (state == 1)
            astatus = "Live..."
          else if (state == 0)
            astatus = "Not Live....."
          //data passing to the auction.ejs
      HighestBid = web3.utils.fromWei(web3.utils.toBN(data[1]), 'ether')
          res.render("product", { data: data, state: astatus, data1: data1, car: car,HighestBid: HighestBid });

        })
      })

    })
  })
});





router.get('/cb',(req,res,next)=>{

  web3.eth.getAccounts().then((x) => {
      console.log(x);

  res.render('current_bidder.ejs',{ data1:x });
  //res.render('current_bidder.ejs',{ data1:x });
  
  
  });
});


router.post('/b',(req,res,next)=>{
  reqdata=req.body;
  address=req.body.bids;
  
  ether=req.body.e;
  auc.methods.bid().send({from:address,value:web3.utils.toWei(ether,'ether'),gas:500000}).then((s)=>{
    if(s)
    console.log("success");
      else
      console.log("error");
        
      
  });
  });



/*router.post('/b',(req,res,next)=>{
ether_requested=req.body;
ether=req.body.e;
console.log("the ether value is",ether);
var weiether=web3.utils.toWei(ether,'ether');
console.log("The converted ether is:",weiether);

});*/





module.exports = router;
