var express = require("express");
var router = express.Router();
var response = require("../models/response");
var responseCodes = require("../models/responseCodes");
var recipeService = require("../services/recipe");
var productService = require("../services/products");
var instructionService = require("../services/instructions");

/* GET add listing. */
router.post("/all/products", function(req, res) {
    productService
        .getAllProducts()
        .then(products => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = products;
            res.json(response);
        })
        .catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
            res.json(response);
        });
});

router.post("/all/recipe", (req, res) => {
    recipeService
        .getAllRecipe()
        .then(recipes => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = recipes;
            res.json(response);
        })
        .catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
            res.json(response);
        });
});

router.post("/all/instruction", (req, res) => {
    console.log("wow");
    instructionService.getAllInstruction().then(instructions => {
        response.header.code = responseCodes.ok;
        response.body = {};
        response.body.success = true;
        response.body.result = instructions;
        res.json(response);
    }).catch(err => {
        response.header.code = err;
        response.body = {};
        response.body.success = false;
        res.json(response);
    });
});

router.post("/one/product", function(req, res, next) {
    console.log(req.body);
    productService
        .getOneProducts(req.body.productId.trim())
        .then(products => {
            // console.log(products);
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = products;
            res.json(response);
        })
        .catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
            res.json(response);
        });
});

router.post("/one/recipe", (req, res) => {
    recipeService
        .getOneRecipe(req.body.id.trim())
        .then(recipe => {
            console.log(recipe);
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = recipe;
            res.json(response);
        })
        .catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
            res.json(response);
        });
});

router.post("/one/instruction", (req, res) => {
    // console.log(req.body.productId);
    instructionService
        .getInstructionByPid(req.body.productId)
        .then(instruction => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = instruction;
            res.json(response);
        })
        .catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
            res.json(response);
        });
});


// router.post("/one/instructions", (req, res) => {
//     instructionService.getOneInstruction(req.body.id).then(instruction => {
//         console.log(instruction);
//         response.header.code = responseCodes.ok;
//         response.body = {};
//         response.body.success = true;
//         response.body.result = instruction;
//         res.json(response);
//     })
//     .catch(err => {
//         response.header.code = err;
//         response.body = {};
//         response.body.success = false;
//         res.json(response);
//     });
// });

module.exports = router;
