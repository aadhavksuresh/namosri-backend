const validation = require('./validation');
const models = require('../models/models');
const responseCodes = require('../models/responseCodes');

module.exports = {
    requestForProduct: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.name || !params.mobile || !params.productId || ! params.address ) {
                reject(responseCodes.invalidRequest);
            } else {
                models.requestProduct.create({
                    name: params.name,
                    address: params.address,
                    productId: params.productId,
                    mobile: params.mobile
                }).then(recipe => {
                    resolve(recipe.dataValues);
                }).catch((err) => {   
                console.log(err);                                 
                    reject(responseCodes.internalError);
                });  
            }
        });
    },
    getAllRequestsForProduct :  function(){
        return new Promise((resolve, reject) => {
            models.requestProduct.findAll({
                where: {
                    served: false
                }
            }).then(request => {
                resolve(request)
            }).catch(err => {
                reject(responseCodes.internalError);
            })
        });
    }
};