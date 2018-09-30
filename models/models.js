var user = require("./user");
var response = require("./response");
var products = require("./products");
var recipe = require("./recipe");
var instructions = require("./instructions");
var connection = require("./connection");
var distributor = require("./distributor");
var getInTouch = require("./getInTouch");

var models = {
    user: user,
    response: response,
    products: products,
    recipe: recipe,
    instructions: instructions,
    distributor: distributor,
    getInTouch: getInTouch,
    Op: connection.Sequelize.Op
};

module.exports = models;
