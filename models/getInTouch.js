"use strict";
var connection = require("./connection");

var getInTouch = connection.sequelize.define(
    "getInTouch",
    {
        id: {
            type: connection.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: connection.Sequelize.STRING
        },
        fName: {
            type: connection.Sequelize.STRING
        },
        lName: {
            type: connection.Sequelize.STRING
        },
        company: {
            type: connection.Sequelize.STRING
        },
        designation: {
            type: connection.Sequelize.STRING
        },
        mobile: {
            type: connection.Sequelize.INTEGER
        },
        typeOfBusiness: {
            type: connection.Sequelize.STRING
        },
        address: {
            type: connection.Sequelize.STRING
        },
        yourMessage: {
            type: connection.Sequelize.TEXT
        }
    },
    {
        timestamp: true
    }
);

getInTouch.sync({ force: false });

module.exports = getInTouch;
