var user = require('./user');
var response = require('./response');
var products = require('./products');
var recipie = require('./recipie');

var models = {
    user : user,
    response : response,
    products: products,
    recipie: recipie
};

module.exports = models;