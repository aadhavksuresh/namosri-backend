const models = require('../models/models');
const validation = require('./validation');
const responseCodes = require('../models/responseCodes');

module.exports = {
    addProduct: function(params){
        return new Promise((resolve, reject) => {
            if(!params.name){
                reject(responseCodes.invalidRequest);
            } else {
                validation.productExists(params.name).then(result => {
                    if(result){
                        reject(responseCodes.productAlreadyExists);
                    } else {
                        models.products.find({
                            where: {
                                position: params.position
                            }
                        }).then(product => {
                            if(!product){
                                models.products.create(params).then(product => {
                                    resolve(product.dataValues);
                                }).catch(err => {
                                    reject(responseCodes.internalError);
                                });
                            } else {
                                reject(responseCodes.positionExists);
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                        
                    }
                }).catch(err => {
                    reject(responseCodes.invalidRequest);
                })
            }
        });
    },
    deleteProduct: function(params){
        return new Promise((resolve, reject) => {
            if(!params.name){
                reject(responseCodes.invalidRequest);
            } else {
                models.products.findOne({
                    where: {
                        name: params.name
                    }
                }).then(product => {
                    if(!product){
                        reject(responseCodes.noProductExists);
                    }
                    product.updateAttributes({
                        visible: false
                    }).then(pro => {
                        resolve(pro.dataValues);
                    }).catch(err => {
                        reject(responseCodes.internalError);
                    });
                }).catch(err => {
                    reject(responseCodes.internalError);
                })
            }
        });
    },
    updateProducts: function(params){
        return new Promise((resolve, reject) => {
            if(!params.oldName || !params.newName){
                reject(responseCodes.invalidRequest);
            } else {
                models.products.findOne({
                    where: {
                        name: params.oldName
                    }
                }).then(product => {
                    if(!product){
                        reject(responseCodes.noProductExists);
                    }
                    product.updateAttributes({
                        name: params.newName,
                        description: params.newDescription,
                        position: params.newPosition
                    }).then(product => {
                        resolve(product.dataValues);
                    }).catch(err => {
                        reject(responseCodes.internalError);
                    });
                }).catch(err => {
                    reject(responseCodes.internalError);
                });
            }
        });
    },
    getAllProducts: function(){
        return new Promise((resolve, reject) => {
            models.products.findAll({
                where: {
                    visible: 1
                }
            }).then(product => {
                resolve(product)
            }).catch(err => {
                reject(responseCodes.internalError);
            })
        });
    }
};