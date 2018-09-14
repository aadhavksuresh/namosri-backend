var user = require('./user');
var response = require('./response');
var products = require('./products');

var models = {
    user : user,
    response : response,
    products: products,
    recipie: recipie
};

module.exports = models;