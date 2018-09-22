var express = require('express');
var router = express.Router();
var userService = require('../services/user');
var productService = require('../services/products');
var recipeService = require('../services/recipe');
var tokenizer = require('../services/tokenizer');
var response = require('../models/response');
var responseCodes = require('../models/responseCodes');
var bcrypt = require("bcrypt");

//remove after creating first user
var models = require("../models/models");
var bcrypt = require("bcrypt");

//remove after creating first user
router.get('/first', (req, res) => {
  bcrypt.hash('admin', 2).then(hash => {
    models.user.create({
      username: 'admin',
      password: hash,
      deactivated: 0,
      id: 1
    }).then(user => {
      res.send(user.dataValues);
    }).catch(err => {
      res.send("some sql errors occured");
    })
  }).catch(err => {
    res.send("some bcrypt error occured");
  })
});

router.get('/', function(req, res, next) {
  res.render("admin/index");
});

router.post('/verifier', (req, res) => {
  tokenizer.varifyUser(req.body.token).then(user => {
    response.header.code = responseCodes.ok;
    response.body = {};
    response.body.success = true;
    res.json(response);
  }).catch(err => {
    response.header.code = responseCodes.unAuthorized;
    response.body = {};
    response.body.success = false;
    res.json(response);
  });
});

router.get('/signup', function(req, res, next) {
  res.render("admin/signup");
});

router.post('/signup', function(req, res) {
  
  if(req.body.password != req.body.verifyPassword){
    response.header.code = responseCodes.enterDifferentPassword;
    response.body = {};
    response.body.success = false;
    res.json(response);
  }

  const params = {
    username: req.body.username,
    password: req.body.password
  }

	tokenizer.varifyUser(req.body.token).then(user => {
    userService.signup(params).then(user => {
      console.log(user);
      response.header.code = responseCodes.ok;
      response.body = {};
      response.body.success = true;
      response.body.user = user.username;
      res.json(response);
    }).catch(err => {
      response.header.code = err;
      response.body = {};
      response.body.success = false;
      response.body.error = err;
      res.json(response);
    });
  }).catch(err => {
    response.header.code = responseCodes.unAuthorized;
    response.body = {};
    response.body.success = false;
    response.body.error = err;
    res.json(response);
  });
});

router.get('/login', function(req, res, next) {
  let invalid = false;
  if(req.query.invalid){
    invalid = req.query.invalid;
  }
  res.render('admin/login', {invalid: invalid});
});

// change to post function
router.post('/login', (req, res) => {

  let params;

  if(req.body.username){
    params = req.body;
  } else {
    params = tokenizer.getUserInfoFromHeader(req.get("Authorization"));
  }

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
      response.body = {};
      response.body.success = false;
      res.json(response);
		});
});

router.get('/delete', (req, res) => {
  res.render('admin/delete');
});

router.post('/delete', (req, res) => {
  let params = req.body;
  tokenizer.varifyUser(req.body.token).then(user => {
    if(user.data.id == 1){
      userService.deleteUser({username: params.username}).then(user => {
        response.header.code = responseCodes.ok;
        response.body = {};
        response.body.success = true;
        response.body.result = user.username;
        res.json(response);
      }).catch(err => {
        response.header.code = err;
        response.body = {};
        response.body.success = false;
        res.json(response);
      });
    } else {
      response.header.code = responseCodes.unAuthorized;
      response.body = {};
      response.body.success = false;
      response.body.result = "You are not authorized to delete a user";
      res.json(response);
    }
  }).catch(err => {
    response.header.code = responseCodes.unAuthorized;
    response.body = {};
    response.body.success = false;
    res.json(response);
  });
});

router.post('/getAll', (req, res) => {
  tokenizer.varifyUser(req.body.token).then(user => {
    if(user.data.id == 1){
      userService.getAllUser(user.data).then(users => {
        response.header.code = responseCodes.ok;
        response.body = {};
        response.body.success = true;
        response.body.result = [];
        for(var i = 0; i<users.length; i++){
          response.body.result.push(users[i].dataValues.username);
        }
        res.json(response);
      }).catch(err => {
        console.log(err);
        response.header.code = err;
        response.body = {};
        response.body.success = false;
        res.json(response);
      });
    } else {
      response.header.code = responseCodes.unAuthorized;
      response.body = {};
      response.body.success = false;
      reponse.body.result = "You are not authorized to delete users";
      res.json(response);
    }
  }).catch(err => {
    response.header.code = err;
    response.body = {};
    response.body.success = false;
    res.json(response);
  });
});

router.get('/changeInfo', (req, res) => {
  res.render('admin/change');
});

router.post('/changeInfo', (req, res) => {
  console.log(req.body);
  if(req.body.newPassword != req.body.retypedPassword){
    response.header.code = responseCodes.invalidRequest;
    response.body = {};
    reponse.body.success = false;
    res.json(response);
  } else {
    tokenizer.varifyUser(req.body.token).then(user => {
      userService.getUser({
        username: user.data.username
      }).then(user => {
        if(req.body.oldUsername != user.username){
          response.header.code = responseCodes.invalidRequest;
          response.body = {};
          response.body.success = false;
          res.json(response);
        } else {
          bcrypt.compare(req.body.oldPassword, user.password).then(function(result) {
            if (result == true) {
                userService.updateUser(req.body).then(user => {
                  response.header.code = responseCodes.ok;
                  response.body = {};
                  response.body.success = true;
                  response.body.result = user.username;
                  response.body.token = tokenizer.getToken(user);
                  res.json(response);
                }).catch(err => {
                  response.header.code = responseCodes.internalError;
                  response.body = {};
                  response.body.success = false;
                  res.json(response);
                });
            } else {
                console.log("owow");
                response.header.code = responseCodes.passwordMismatch;
                response.body = {};
                response.body.success = false;
                res.json(response);
            }
          }).catch((err) => {                                        
            response.header.code = responseCodes.internalError;
            response.body = {};
            response.body.success = false;
            res.json(response);
          });
        }
      }).catch(err => {
        response.header.code = responseCodes.internalError;
        response.body = {};
        response.body.success = false;
        res.json(response);
      });
    }).catch(err => {
      response.header.code = responseCodes.unAuthorized;
      response.body = {};
      response.body.success = false;
      res.json(response);
    });
  }
});

module.exports = router;
