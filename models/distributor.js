'use strict';
var connection = require('./connection');

var Distributor = connection.sequelize.define('distributor', {
    id: {
        type: connection.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nameOfFirm: {
        type: connection.Sequelize.STRING,
        
    },
    background: {
        type: connection.Sequelize.STRING,
        
    },
    address: {
        type: connection.Sequelize.STRING,
        
    },
    city: {
        type: connection.Sequelize.STRING,
        
    },
    infrastructure: {
        type: connection.Sequelize.STRING,
        
    },
    state: {
        type: connection.Sequelize.STRING,
        
    },
    pin: {
        type: connection.Sequelize.INTEGER,
        
    },
    infrastructure1: {
        type: connection.Sequelize.STRING,
        
    },
    telephoneNumber: {
        type: connection.Sequelize.INTEGER
    },
    mobileNumber: {
        type: connection.Sequelize.INTEGER,
        
    },
    faxNumber: {
        type: connection.Sequelize.INTEGER,
        
    },
    emailId: {
        type: connection.Sequelize.STRING,
        
    },
    yearOfEstabilshment: {
        type: connection.Sequelize.INTEGER,
        
    },
    businessType: {
        type: connection.Sequelize.INTEGER,
        
    },
    annualSales: {
        type: connection.Sequelize.STRING,
        
    },
    capacityToInvest: {
        type: connection.Sequelize.STRING,
        
    },
    keyPerson: {
        type: connection.Sequelize.STRING,
        
    },
    name: {
        type: connection.Sequelize.STRING,
        
    },
    existingManpower: {
        type: connection.Sequelize.STRING,
        
    },
    age: {
        type: connection.Sequelize.INTEGER,
        
    },
    qualification: {
        type: connection.Sequelize.TEXT,
        
    },
    propose: {
        type: connection.Sequelize.STRING,
        
    }
}, {
	timestamp: true
});

Distributor.sync({force: false});

module.exports  =  Distributor;