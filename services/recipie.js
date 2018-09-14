const validation = require('./validation');
const models = require('../models/models');
const responseCodes = require('../models/responseCodes');

module.exports = {
    addRecipie: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.name || !params.description || !params.picture_url) {
                reject(responseCodes.invalidRequest);
            } else {
                validation.recipieExists(params.name)
                    .then(result => {
                        // console.log(params);
                        if (result) {
                            reject(responseCodes.alreadyExists);
                        } else { 
                            models.recipie.create(params).then(recipie => {
                                resolve(recipie.dataValues);
                            }).catch((err) => {                                    
                                reject(responseCodes.internalError);
                            });            
                        }
                    }).catch(err => {                        
                        reject(responseCodes.internalError);
                    });
            }
        });
    }
};