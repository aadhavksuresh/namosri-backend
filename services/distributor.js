const models = require('../models/models');
const responseCodes = require('../models/responseCodes');

module.exports = {
    addDistributor: (params) => {
        return new Promise((resolve, reject) => {
            models.distributor.create(params).then(distributor => {
                resolve(distributor.dataValues);
            }).catch(err => {
                reject(responseCodes.internalError);
            }); 
        });
    },
    getAllDistributors: function(){
        return new Promise((resolve, reject) => {
            models.distributor.findAll().then(distributor => {
                resolve(distributor);
            }).catch(err => {
                reject(responseCodes.internalError);
            })
        });
    },
    deleteDistributor: function(params){
        return new Promise((resolve, reject) => {
            if(!params.name){
                reject(responseCodes.invalidRequest);
            } else {
                models.distributor.destroy({
                    where: {
                        nameOfFirm: params.name
                    }
                }).then(() => {
                    resolve(responseCodes.ok);
                }).catch(err => {
                    reject(responseCodes.internalError);
                });
            }
        });
    },
    getOneDistributor: function(id){
        return new Promise((resolve, reject) => {
            models.distributor.findOne({
                where: {
                    id: id
                }
            }).then(distributor => {
                resolve(distributor);
            }).catch(err => {
                reject(responseCodes.internalError);
            })
        });
    }
};