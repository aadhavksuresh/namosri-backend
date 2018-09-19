var user = require('./user');
var response = require('./response');
var products = require('./products');
var recipie = require('./recipie');
var instructions = require('./instructions');
var connection = require('./connection');

var models = {
    user : user,
    response : response,
    products: products,
    recipie: recipie,
    instructions: instructions,
    Op: connection.Sequelize.Op
};

module.exports = models;