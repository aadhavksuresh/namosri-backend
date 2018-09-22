'use strict';
var connection = require('./connection');
var User = require('./user');

var Recipe = connection.sequelize.define('recipe', {
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
		allowNull: false,
		defaultValue: 'defaultRecipe.jpg'
	},
	is_used: {
		type: connection.Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: true
	}
}, {
	timestamp: true
});

Recipe.belongsTo(User, {foreignKey: 'u_id', targetKey: 'id'});
Recipe.sync({force: false});

module.exports  =  Recipe;