var express = require('express');
var router = express.Router();
var tokenizer = require('../services/tokenizer');
var response = require('../models/response');
var responseCodes = require('../models/responseCodes');
var recipieService = require('../services/recipie');
var productServices = require('../services/products');
var instructionService = require('../services/instructions');

/* GET add listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/recipie', function(req, res, next) {
  res.render('index');  
});

router.post('/recipie', function(req, res, next) {
  // const params = req.body;
  // remove after debugging
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hcmVuZHJhMSIsImlkIjoxLCJpYXQiOjE1MzY5MzcwOTcsImV4cCI6MTUzNjk0NDI5N30.RSHCkBCR-imI5c39QoXIdHGUnAjYYiOEFLAmVGForgw";
  let param = {
    name: "narendra1111",
    description: "kumawat",
    picture_url: " nknknknnkknk",
    u_id:""
  };

  tokenizer.varifyUser(token).then((data) => {
    if(data.status) {
        param.u_id = data.data.id;
        recipieService.addRecipie(param).then((recipie) => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.recipie = recipie;
            res.json(response);
        }).catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
		    res.json(response);
        })
    } else {
        response.header.code = responseCodes.unAuthorized;
        response.body = {};
        response.body.success = false;
        res.json(response);
    }
  }).catch((err) => {
    response.header.code = err;
    response.body = {};
    response.body.success = false;
    res.json(response);
  });
});

router.post('/products', (req, res) => {
  let params = req.body;
    //just for checking
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hcmVuZHJhMSIsImlkIjoxLCJpYXQiOjE1MzY5MzcwOTcsImV4cCI6MTUzNjk0NDI5N30.RSHCkBCR-imI5c39QoXIdHGUnAjYYiOEFLAmVGForgw";

    tokenizer.varifyUser(params.token).then(user => {
        params.data.userId = user.data.id;
        productServices.addProduct(params.data).then(product => {
            response.header.code = responseCodes.ok;
            response.body.success = true;
            response.body.result = product
            res.json(response);
        }).catch(err => {
            response.header.code = err;
            response.body.success = false;
            res.json(response);
        });
    }).catch(err => {
        response.header.code = err;
        response.body = {};
        response.body.success = false;
        res.json(response);
    });
});

router.post('/instructions', (req, res) => {
    let params = req.body;
    tokenizer.varifyUser(params.token).then(user => {
        params.data.userId = user.data.id;
        console.log(params.data);
        instructionService.addInstruction(params.data).then(instruction => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = instruction;
            res.json(response);
        }).catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
            res.json(response);
        })
    }).catch(err => {
        response.header.code = err;
        response.body = {};
        response.body.success = false;
        res.json(response);
    });
});

module.exports = router;
