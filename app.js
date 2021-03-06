var express = require('express');
var path = require('path');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/main site/index');
var products = require('./routes/main site/products');
var user = require('./routes/user');
var addRequests = require('./routes/add');
var deleteRequests = require('./routes/delete');
var updateRequests = require('./routes/update');
var getRequest = require('./routes/get');
var uploadRequest = require('./routes/upload');
var requestForProduct = require('./routes/requestForProduct');

var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json({
  limit: '8mb'
}));
app.use(bodyParser.urlencoded({
  limit: '8mb',
  extended: true
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// define all routes here
app.use('/', index);
app.use('/products' , products);

app.use('/user', user);
app.use('/add', addRequests);
app.use('/delete', deleteRequests);
app.use('/update', updateRequests);
app.use('/get' , getRequest);
app.use('/upload' , uploadRequest);
app.use('/request' , requestForProduct);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found ' + err);
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error' , {msg: err.message});
});

module.exports = app;
