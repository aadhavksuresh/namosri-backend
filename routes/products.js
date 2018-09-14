let router = require('express').Router();
let productServices = require('../services/products');
let response = require('../models/response');
let responseCodes = require('../models/responseCodes');

router.post('/', (req, res) => {
    let params = req.body;
    productServices.addProduct(params).then(product => {
        response.header.code = responseCodes.ok;
        response.body.success = true;
        response.body.result = product
        res.json(response);
    }).catch(err => {
        response.header.code = err;
        response.body.success = false;
        res.json(response);
    });
});

router.post('/delete', (req, res) => {
    let params = req.body;
    productServices.deleteProduct(params).then(product => {
        response.header.code = responseCodes.ok;
        response.body.success = true;
        response.body.result = product;
        res.json(response);
    }).catch(err => {
        response.header.code = err;
        response.body.success = false;
        response.body.result = null;
        res.json(response);
    })
});

router.post('/update', (req, res) => {
    
    productServices.updateProducts(req.body.oldValue, req.body.newValues).then(product => {
        response.header.code = responseCodes.ok;
        response.body.success = true;
        response.body.result = product;
        res.json(response);
    }).catch(err => {
        response.header.code = err;
        response.body.success = false;
        response.body.result = null;
        res.json(response);
    });
})

module.exports = router;

