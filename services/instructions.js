const models = require('../models/models');
const responseCodes = require('../models/responseCodes');

module.exports = {
    addInstruction: function(params){
        return new Promise((resolve, reject) => {
            if(!params.description || !params.productId || !params.userId){
                reject(responseCodes.invalidRequest);
            } else {
                models.instructions.create(params).then(instruction => {
                    resolve(instruction.dataValues);
                }).catch(err => {
                    reject(responseCodes.internalError);
                }); 
            }
        });
    },
    deleteInstructions: function(params){
        return new Promise((resolve, reject) => {
            if(!params.id){
                reject(responseCodes.invalidRequest);
            } else {
                models.instructions.destroy({
                    where: params
                }).then(() => {
                    resolve(responseCodes.ok);
                }).catch(err => {
                    reject(responseCodes.internalError);
                });
            }
        });
    },
    updateInstructions: function(oldValue, newValues){
        return new Promise((resolve, reject) => {
            if(!oldValue.id){
                reject(responseCodes.invalidRequest);
            } else {
                models.instructions.findOne({
                    where: oldValue
                }).then(instruction => {
                    if(!instruction){
                        reject(responseCodes.noInstructionExists);
                    } else {
                        instruction.updateAttributes(newValues).then(instruction => {
                            resolve(instruction);
                        }).catch(err => {
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