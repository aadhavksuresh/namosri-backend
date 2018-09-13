var express = require('express');
var router = express.Router();
var userService = require('../services/user');
var tokenizer = require('../services/tokenizer');
var response = require('../models/response');
var responseCodes = require('../models/responseCodes');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// change to post function
router.post('/signup', function(req, res, next) {
  // const params = req.body;
  // remove after debugging
  const params = {
    username: "narendra",
    password: "kumawat"
  }
 
  console.log(params);             
	userService.signup(params).then(user => {
		const token = tokenizer.getToken(user);
    response.header.code = responseCodes.ok;
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
router.get('/login', (req, res, next) => {
  // const params = req.body;
  const params = {
    username: "narendra",
    password: "kumawat"
  }
	userService.loginUser(params)
		.then(user => {
			const token = tokenizer.getToken(user);
			response.header.code = responseCodes.ok;
      response.body.success = true;
      response.body.token = token;
      res.json(response);
		}).catch(err => {
			response.header.code = err;
      response.body.success = false;
      res.json(response);
		});
});

module.exports = router;
