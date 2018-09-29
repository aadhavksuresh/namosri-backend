'use strict';

let connection = require('./connection');
let User = require('./user');

let Products = connection.sequelize.define('products', {
    productId: {
        type: connection.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: connection.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: connection.Sequelize.TEXT,
        allowNull: true
    },
    productImage: {
        type: connection.Sequelize.TEXT,
        allowNull: true,
        defaultValue: "default.jpg"
    },
    position: {
        type: connection.Sequelize.INTEGER,
        allowNull: false
    },
    visible: {
        type: connection.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: true
});

Products.belongsTo(User);
Products.sync({force: false});

module.exports = Products;