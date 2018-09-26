'use strict';
let connection = require('./connection');
let User = require('./user');
let Products = require('./products');

let Instruction = connection.sequelize.define('instructions', {
    id: {
        type: connection.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: connection.Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: connection.Sequelize.TEXT,
        allowNull: false
    }
});

Products.belongsTo(User);
Instruction.belongsTo(Products, {foreignKey: 'productId', targetKey: 'productId'});
Instruction.sync({force: false});

module.exports = Instruction;