const validation = require('./validation');
const models = require('../models/models');
const responseCodes = require('../models/responseCodes');

module.exports = {
    addrecipe: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.name || !params.description ) {
                reject(responseCodes.invalidRequest);
            } else {
                validation.recipeExists(params.name)
                    .then(result => {
                        // console.log(params);
                        if (result) {
                            reject(responseCodes.alreadyExists);
                        } else { 
                            models.recipe.create({
                                name: params.name,
                                description: params.description,
                                u_id: params.u_id
                            }).then(recipe => {
                                resolve(recipe.dataValues);
                            }).catch((err) => {                                    
                                reject(responseCodes.internalError);
                            });            
                        }
                    }).catch(err => {                        
                        reject(responseCodes.internalError);
                    });
            }
        });
    },
    deleteRecipe: function(params){
        return new Promise((resolve, reject) => {
            if(!params.name){
                reject(responseCodes.invalidRequest);
            } else {
                models.recipe.findOne({
                    where: {
                        name: params.name
                    }
                }).then(recipe => {
                    if(!recipe){
                        reject(responseCodes.noRecipeExists);
                    }
                    recipe.updateAttributes({
                        is_used: 0
                    }).then(recipe => {
                        resolve(recipe.dataValues);
                    }).catch(err => {
                        reject(responseCodes.internalError);
                    });
                }).catch(err => {
                    reject(responseCodes.internalError);
                })
            }
        });
    },
    updateRecipe: function(params){
        return new Promise((resolve, reject) => {
            if(!params.oldName || !params.newName){
                reject(responseCodes.invalidRequest);
            } else {
                models.recipe.findOne({
                    where: {
                        name: params.oldName
                    }
                }).then(recipe => {
                    if(!recipe){
                        reject(responseCodes.noRecipeExists);
                    }
                    recipe.updateAttributes({
                        name: params.newName,
                        description: params.newDescription
                    }).then(recipe => {
                        resolve(recipe.dataValues);
                    }).catch(err => {
                        reject(responseCodes.internalError);
                    });
                }).catch(err => {
                    reject(responseCodes.internalError);
                });
            }
        });
    },
    getAllRecipe: function(params){
        return new Promise((resolve, reject) => {
            models.recipe.findAll({
                where: {
                    is_used: 1
                }
            }).then(recipe => {
                resolve(recipe)
            }).catch(err => {
                reject(responseCodes.internalError);
            })
        });
    }
};