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
    description: {
        type: connection.Sequelize.STRING,
        allowNull: false
    }
});

Instruction.belongsTo(User);
Instruction.belongsTo(Products, {foreignKey: 'productId', targetKey: 'productId'});
Instruction.sync({force: false});

module.exports = Instruction;