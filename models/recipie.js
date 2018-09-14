'use strict';
var connection = require('./connection');
var User = require('./user');
var Recipie = connection.sequelize.define('recipie', {
	id: { 
		type: connection.Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	u_id: {
		type: connection.Sequelize.INTEGER,
		allowNull: false
	},
	name: {
		type: connection.Sequelize.STRING,
		allowNull: false
    },
    description: {
		type: connection.Sequelize.TEXT,
		allowNull: false
    },
    picture_url: {
		type: connection.Sequelize.TEXT,
		allowNull: false
	},
	is_used: {
		type: connection.Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: true
	}
}, {
	timestamp: true
});

Recipie.belongsTo(User, {foreignKey: 'u_id', targetKey: 'id'});
Recipie.sync({force: false});

module.exports  =  Recipie;