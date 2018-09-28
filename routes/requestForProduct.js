var express = require("express");
var router = express.Router();
var response = require("../models/response");
var responseCodes = require("../models/responseCodes");
var requestProductService = require("../services/requestForProduct");
let tokenizer = require("../services/tokenizer");
var productService = require("../services/products");

/* GET add listing. */

router.post("/product", function(req, res) {
    console.log("product request");
    var params = req.body;
    requestProductService
        .requestForProduct(params)
        .then(request => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            res.json(response);
        })
        .catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
            res.json(response);
        });
});


router.post("/send", function(req, res) {
    console.log("product request");
    var params = req.body;

    tokenizer.varifyUser(params.token).then(user => {
        requestProductService
            .sendRequestProduct(params.id)
            .then(request => {
                response.header.code = responseCodes.ok;
                response.body = {};
                response.body.success = true;
                res.json(response);
            })
            .catch(err => {
                response.header.code = err;
                response.body = {};
                response.body.success = false;
                res.json(response);
            });
    })
    .catch(err => {
        response.header.code = err;
        response.body = {};
        response.body.success = false;
        res.json(response);
    });
});



router.get('/:id', function(req, res) {

    console.log("nk");
    requestProductService.getRequestsForProductById(req.params.id)
    .then(request => {
         productService
            .getOneProducts(request.productId)
            .then(product => {
                // console.log(request);
                res.render('product/request', { request: request, product : product});
            })
            .catch(err => {
                response.header.code = err;
                response.body = {};
                response.body.success = false;
                res.json(response);
            });
    })
    .catch(err => {
        response.header.code = err;
        response.body = {};
        response.body.success = false;
        res.json(response);
    });
});





module.exports = router;
