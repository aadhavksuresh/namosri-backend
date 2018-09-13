'use strict';
var connection = require('./connection');

var User = connection.sequelize.define('user', {
	id: { 
		type: connection.Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: connection.Sequelize.STRING,
		allowNull: true
	},
	password: {
		type: connection.Sequelize.STRING,
		allowNull: false
	},
	deactivated: {
		type: connection.Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
}, {
	timestamp: true
});

User.sync({force: false});

module.exports  =  User;