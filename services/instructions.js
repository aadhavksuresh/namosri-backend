const models = require('../models/models');
const responseCodes = require('../models/responseCodes');

module.exports = {
    addInstruction: function(params){
        return new Promise((resolve, reject) => {
            if(!params.description || !params.productId || !params.userId){
                reject(responseCodes.invalidRequest);
            } else {
                models.instructions.create({
                    description: params.description,
                    productId: params.productId,
                    userId: params.userId
                }).then(instruction => {
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
                    where: {
                        id: params.id
                    }
                }).then(() => {
                    resolve(responseCodes.ok);
                }).catch(err => {
                    reject(responseCodes.internalError);
                });
            }
        });
    },
    updateInstructions: function(params){
        return new Promise((resolve, reject) => {
            if(!params.id){
                reject(responseCodes.invalidRequest);
            } else {
                models.instructions.findOne({
                    where: {
                        id: params.id
                    }
                }).then(instruction => {
                    if(!instruction){
                        reject(responseCodes.noInstructionExists);
                    } else {
                        instruction.updateAttributes({
                            description: params.newDescription
                        }).then(instruction => {
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
    },

    getAllInstruction: function(){
        return new Promise((resolve, reject) => {
            models.instructions.findAll().then(instructions => {
                resolve(instructions);
            }).catch(err => {
                reject(err);
            });
        });
    },
    getOneInstruction: function(iid){
        return new Promise((resolve, reject) => {
            models.instructions.findOne({
                where: {
                    id: iid
                }
            }).then(instruction => {
                resolve(instruction);
            }).catch(err => {
                reject(responseCodes.internalError);
            })
        });
    },
    getInstructionByPid: function (pid) {
         return new Promise((resolve, reject) => {
            if(!pid){
                reject(responseCodes.invalidRequest);
            } else {
                models.instructions.findAll({
                    where: {productId: pid}
                }).then(instruction => { 
                    if(!instruction){
                        reject(responseCodes.noInstructionExists);
                    } else {                        
                        resolve(instruction);                                            
                    }
                }).catch(err => {
                    reject(responseCodes.internalError);
                });
            }
        });   
    }

};