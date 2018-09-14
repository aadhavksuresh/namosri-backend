'use strict';
const models = require('../models/models');

module.exports = {
	userExists: function(param) {
		return new Promise((resolve, reject) => {
			let condition = {
				username: param
			};	
			models.user.findOne({
				where: condition
			}).then((user) => {
			    if (user) {
			    	resolve(true);
			    } else {
			    	resolve(false);
			    }
			}).catch((err) => {
			    reject(err);
			});
		});
	},
	productExists: function(param){
		return new Promise((resolve, reject) => {
			let condition = {
				name: param
			};

			models.products.findOne({
				where: condition
			}).then(product => {
				if(product)
					resolve(true);
				else
					resolve(false);
			}).catch(err => {
				reject(err);
			});
		});
	}
};