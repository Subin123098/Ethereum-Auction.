var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Web3=require('web3');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); 

var MyContractJSON =require(path.join(__dirname, 'build/contracts/Auction.json'))



contractAddress = MyContractJSON.networks['4002'].address;

console.log("contract Address is--->",contractAddress)

const abi = MyContractJSON.abi;
 //creating contract object
 auc = new web3.eth.Contract(abi, contractAddress);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bidderrouter = require('./routes/current_bidder');
var getbidder=require('./routes/getbid');
var getbidback=require('./routes/bidback');
var withdraw=require('./routes/withdraw');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/current_bidder',bidderrouter);
app.use('/users', usersRouter);
app.use('/getbid',getbidder);
app.use('/bidback',getbidback);
app.use('/withdraw',withdraw);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
