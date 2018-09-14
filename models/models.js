var user = require('./user');
var response = require('./response');
var products = require('./products');
var recipie = require('./recipie');
var instruction = require('./instruction');

var models = {
    user : user,
    response : response,
    products: products,
    recipie: recipie,
    instruction: instruction
};

module.exports = models;