let router = require('express').Router();
let productServices = require('../services/products');
let recipeServices = require('../services/recipe');
let instructionServices = require('../services/instructions');
let distributorServices = require("../services/distributor");
let response = require('../models/response');
let responseCodes = require('../models/responseCodes');
let tokenizer = require("../services/tokenizer");

// router.get('/product/:id', (req, res) => {
//     res.render('product/delete' , {pid : req.params.id});
// });

// router.get('/recipe', (req, res) => {
//     res.render('recipe/delete');
// });

router.post('/products', (req, res) => {
    let params = req.body;
    tokenizer.varifyUser(params.token).then(user => {
        params.userId = user.data.id;
        productServices.deleteProduct(params).then(product => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = product.name;
            res.json(response);
        }).catch(err => {
            response.header.code = err;
            response.body = {};
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

router.post('/recipe', (req, res) => {
    tokenizer.varifyUser(req.body.token).then(user => {
        recipeServices.deleteRecipe(req.body).then(recipe => {
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
        });
    }).catch(err => {
        response.header.code = err;
        response.body = {};
        response.body.success = false;
        res.json(response);
    });
});

router.post('/instruction', (req, res) => {
    let params = req.body;
    tokenizer.varifyUser(params.token).then(user => {
        instructionServices.deleteInstructions(params).then(insturction => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = insturction;
            res.json(response);
        }).catch(err => {
            response.header.code = err;
            response.body = {};
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

router.post('/distributor', (req, res) => {
    let params = req.body;
    tokenizer.varifyUser(params.token).then(user => {
        distributorServices.deleteDistributor(params).then(distributor => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = distributor;
            res.json(response);
        }).catch(err => {
            response.header.code = err;
            response.body = {};
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

module.exports = router;