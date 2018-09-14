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
                        models.products.create(params).then(product => {
                            resolve(product.dataValues);
                        }).catch(err => {
                            reject(responseCodes.internalError);
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
        })
    },
    updateProducts: function(oldValue, newValues){
        return new Promise((resolve, reject) => {
            if(!oldValue.name || !newValues){
                reject(responseCodes.invalidRequest);
            } else {
                models.products.findOne({
                    where: {
                        name: oldValue.name
                    }
                }).then(product => {
                    if(!product){
                        reject(responseCodes.noProductExists);
                    }
                    product.updateAttributes(
                        newValues
                    ).then(product => {
                        resolve(product.dataValues);
                    }).catch(err => {
                        reject(responseCodes.internalError);
                    });
                }).catch(err => {
                    reject(responseCodes.internalError);
                });
            }
        })
    }
};