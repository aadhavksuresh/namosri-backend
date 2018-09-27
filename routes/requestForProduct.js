var express = require("express");
var router = express.Router();
var response = require("../models/response");
var responseCodes = require("../models/responseCodes");
var requestProductService = require("../services/requestForProduct");


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






module.exports = router;
