var express = require("express");
var router = express.Router();
var response = require("../models/response");
var responseCodes = require("../models/responseCodes");
var recipeService = require("../services/recipe");
var productService = require("../services/products");
var instructionService = require("../services/instructions");
var distributorService = require("../services/distributor");
var getInTouchService = require("../services/getInTouch");
var requestProductService = require("../services/requestForProduct");
let tokenizer = require("../services/tokenizer");

/* GET add listing. */
router.get("/all/distributors", (req, res) => {
    res.render("distributors/index");
});

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
    instructionService
        .getAllInstruction()
        .then(instructions => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = instructions;
            res.json(response);
        })
        .catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
            res.json(response);
        });
});

router.post("/all/distributors", (req, res) => {
    distributorService
        .getAllDistributors()
        .then(distributor => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = distributor;
            res.json(response);
        })
        .catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
            res.json(response);
        });
});

router.post("/all/getintouches", (req, res) => {
    getInTouchService
        .getAllGetInTouch()
        .then(getInTouches => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = getInTouches;
            res.json(response);
        })
        .catch(err => {
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

router.get("/one/distributor/:id", (req, res) => {
    console.log(req.params.id);
    res.render("distributors/one", { did: req.params.id });
});

router.post("/one/distributor", (req, res) => {
    distributorService
        .getOneDistributor(req.body.id)
        .then(distributor => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = distributor;
            res.json(response);
        })
        .catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
            res.json(response);
        });
});

router.get("/one/getInTouch/:id", (req, res) => {
    console.log(req.params.id);
    res.render("distributors/getInTouch", { gid: req.params.id });
});

router.post("/one/getInTouch", (req, res) => {
    getInTouchService
        .getOneGetInTouch(req.body.id)
        .then(getInTouch => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = getInTouch;
            res.json(response);
        })
        .catch(err => {
            response.header.code = err;
            response.body = {};
            response.body.success = false;
            res.json(response);
        });
});
router.post("/all/requests", (req, res) => {
    tokenizer.varifyUser(req.body.token).then(user => {
        requestProductService
            .getAllRequestsForProduct()
            .then(request => {
                response.header.code = responseCodes.ok;
                response.body = {};
                response.body.success = true;
                response.body.result = request;
                res.json(response);
            })
            .catch(err => {
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

router.post("/one/request", (req, res) => {
    // console.log(req.body.productId);
    requestProductService
        .getAllRequestsForProduct()
        .then(request => {
            response.header.code = responseCodes.ok;
            response.body = {};
            response.body.success = true;
            response.body.result = request;
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
