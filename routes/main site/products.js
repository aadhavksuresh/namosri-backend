var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('delispices/products', { active: 'products' });
});

router.get('/:id', function(req, res) {
    res.render('delispices/singleProduct', { productId: req.params.id  , active :"products"});
});


module.exports = router;