var express = require('express');
var router = express.Router();
var tokenizer = require('../services/tokenizer');
var response = require('../models/response');
var responseCodes = require('../models/responseCodes');
var recipeService = require('../services/recipe');
var productServices = require('../services/products');
var instructionService = require('../services/instructions');
var distributorService = require("../services/distributor");

/* GET add listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/products', (req, res) => {
    res.render("product/add");
});

router.get('/recipe', function(req, res, next) {
  res.render('recipe/add');  
});

router.get('/instruction', (req, res) => {
  res.render('instruction/add');
});

router.post('/recipe', function(req, res) {

  var params = req.body;

  tokenizer.varifyUser(params.token).then((data) => {
    if(data.status) {
        params.u_id = data.data.id;
        recipeService.addrecipe(params).then((recipe) => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = recipe.name;
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

    tokenizer.varifyUser(params.token).then(user => {
        params.userId = user.data.id;
        
        productServices.addProduct(params).then(product => {
            console.log(3);
            response.header.code = responseCodes.ok;
            response.body.success = true;
            response.body.result = product
            res.json(response);
        }).catch(err => {
            console.log(4);
            response.header.code = err;
            response.body.success = false;
            res.json(response);
        });
        
    }).catch(err => {
        console.log(5);
        response.header.code = err;
        response.body = {};
        response.body.success = false;
        res.json(response);
    });
});

router.post('/instruction', (req, res) => {
    let params = req.body;
    tokenizer.varifyUser(params.token).then(user => {
        params.userId = user.data.id;
        console.log(params);
        instructionService.addInstruction(params).then(instruction => {
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


router.post('/dis', (req, res) => {
    distributorService.addDistributor(req.body).then(distributor => {
        response.header.code = responseCodes.ok;
        response.body.success = true;
        response.body.result = distributor;
        res.json(response);
    }).catch(err => {
        response.header.code = err;
        response.body.success = false;
        res.json(response);
    });
});

module.exports = router;
