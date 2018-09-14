var user = require('./user');
var response = require('./response');
var products = require('./products');

var models = {
    user : user,
    products: products,
    response : response
};

module.exports = models;