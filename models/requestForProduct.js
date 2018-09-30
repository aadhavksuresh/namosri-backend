'use strict';

let connection = require('./connection');
let Products = require('./products');

let RequestForProduct = connection.sequelize.define('requestProducts', {
    id: {
        type: connection.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: connection.Sequelize.INTEGER
    },
    name: {
        type: connection.Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: connection.Sequelize.TEXT,
        allowNull: false
    },
    mobile: {
        type: connection.Sequelize.STRING,
        allowNull: false
    },
    served: {
        type: connection.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: true
});

RequestForProduct.belongsTo(Products, {foreignKey: 'productId', targetKey: 'productId'});
RequestForProduct.sync({force: false});

module.exports = RequestForProduct;