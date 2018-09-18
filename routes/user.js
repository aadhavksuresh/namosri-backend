var express = require('express');
var router = express.Router();
var userService = require('../services/user');
var tokenizer = require('../services/tokenizer');
var response = require('../models/response');
var responseCodes = require('../models/responseCodes');

/* GET users listing. */
router.post('/', function(req, res) {
  error=false;
  if(req.query.error){
    error = req.query.error;
  }
  tokenizer.varifyUser(req.body.token).then(user => {
    res.render('adminIndex');
  }).catch(err => {
    res.redirect('/user/login?invalid=true');
  });
});

router.get('/login', function(req, res) {
  var invalid = false;
  if(req.query.invalid){
    invalid = req.query.invalid;
  }
  res.render('login', {invalid: invalid});
});

// router.get('/signup', function(req, res) {
//   res.render('index', { title: 'Signup' });
// });

router.post('/signup', function(req, res) {
  // const params = req.body;
  // remove after debugging
  reqHeader = tokenizer.getUserInfoFromHeader(req);

  const params = {
    username: reqHeader.username,
    password: reqHeader.password
  };
              
	userService.signup(params).then(user => {
		const token = tokenizer.getToken(user);
    response.header.code = responseCodes.ok;
    response.body = {};
    response.body.success = true;
    response.body.token = token;
		res.json(response);
	}).catch(err => {
    response.header.code = err;
    response.body.success = false;
		res.json(response);
	});
});

// change to post function
router.post('/login', (req, res) => {

  let params = {};

  reqHeader = tokenizer.getUserInfoFromHeader(req);

  params.username = reqHeader.username;
  params.password = reqHeader.password;

	userService.loginUser(params)
		.then(user => {
      const token = tokenizer.getToken(user);
      response.header.code = responseCodes.ok;
      response.body = {};
      response.body.success = true;
      response.body.token = token;
      res.json(response);
		}).catch(err => {
			response.header.code = err;
      response.body.success = false;
      res.json(response);
		});
});

router.post('/addUser', (req, res) => {
  tokenizer.varifyUser(req.body.token).then(user => {
    res.render('addUser');
  }).catch(err => {
    res.redirect('/user?error=true');
  });
});

router.post('/delete', (req, res) => {
  let params = req.body;
  userService.deleteUser(params).then(user => {
    console.log("why");
    response.header.code = responseCodes.ok;
    response.body = {};
    response.body.success = true;
    response.body.result = user;
    res.json(response)
  }).catch(err => {
    console.log("shy");
    response.header.code = err;
    response.body = {};
    response.body.success = false;
    res.json(response);
  });
});

module.exports = router;
