var user = require('./user');
var response = require('./response');
var products = require('./products');
var recipe = require('./recipe');
var instructions = require('./instructions');
var connection = require('./connection');
var requestProduct = require('./requestForProduct')

var models = {
    user : user,
    response : response,
    products: products,
    recipe: recipe,
    instructions: instructions,
    Op: connection.Sequelize.Op,
    requestProduct : requestProduct
};

module.exports = models;