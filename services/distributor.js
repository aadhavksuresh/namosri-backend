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
    }
};