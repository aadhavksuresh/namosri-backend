var user = require('./user');
var response = require('./response');
var product = require('./products');
var recipie = require('./recipie');

var models = {
    user : user,
    response : response,
    product: product,
    recipie: recipie
};

module.exports = models;