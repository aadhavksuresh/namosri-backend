const validation = require('./validation');
const models = require('../models/models');
const bcrypt = require('bcrypt');
const responseCodes = require('../models/responseCodes');

module.exports = {
//  ============= used by admin only for providing access to another user===============
    signup: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.username || !params.password) {
                reject(responseCodes.invalidRequest);
            } else {
                validation.userExists(params.username)
                    .then(result => {
                        if (result) {
                            reject(responseCodes.userAlreadyExists);
                        } else { 
                            bcrypt.hash(params.password, 2).then((hash) => {
                                params.password = hash;
                                models.user.create(params).then(user => {
                                    console.log(user.dataValues);
                                    resolve(user.dataValues);
                                }).catch((err) => {                                  
                                    reject(responseCodes.internalError);
                                });
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
// ============================= login user =================================
    loginUser: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.username || !params.password) {
                reject(responseCodes.invalidRequest);
            } else {
                validation.userExists(params.username)
                    .then(result => {
                        if (result) {
                            models.user.findOne({
                                where: {
                                    username: params.username,
                                    deactivated: 0
                                }
                            }).then(user => {
                                if (user) {
                                    bcrypt.compare(params.password, user.dataValues.password)
                                        .then(function(res) {
                                            if (res == true) {
                                                resolve(user.dataValues);
                                            } else {
                                                reject(responseCodes.passwordMismatch);
                                            }
                                    }).catch((err) => {                                        
                                        reject(responseCodes.internalError);
                                    });
                                }
                            }).catch(err => {
                                reject(responseCodes.internalError);
                            })
                        } else {
                            reject(responseCodes.internalError);
                        }
                    }).catch(err => {                        
                        reject(responseCodes.userAlreadyExists);
                    });
            }
        });
    },
//  ============== get user information =============
    getUser: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.username) {
                reject(responseCodes.invalidRequest);
            } else {
                validation.userExists(params.username)
                    .then(result => {
                        if (result) {
                            models.user.findOne({
                                where: {
                                    username: params.username
                                }
                            }).then(user => {
                                if (user) {
                                    resolve(user.dataValues);
                                }
                            }).catch(err => {
                                reject(responseCodes.internalError);
                            })
                        } else {
                            reject(responseCodes.internalError);
                        }
                    }).catch(err => {                        
                        reject(responseCodes.internalError);
                    });
            }
        });
    },
    //gives all users except user no 1
    getAllUser: function(params){
        return new Promise((resolve, reject) => {
            if(!params.username){
                reject(responseCodes.invalidRequest);
            } else {
                models.user.findAll({
                    where: {
                        id: {
                            [models.Op.ne]: 1
                        },
                        deactivated: 0
                    }
                }).then(users => {
                    resolve(users);
                }).catch(err => {
                    reject(responseCodes.internalError);
                })
            }
        });
    },
//  ================= update user values =================
    updateUser: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.oldUsername) {
                reject(responseCodes.invalidRequest);
            } else {
                models.user.findOne({
                    where: {
                        username: params.oldUsername
                    }
                }).then(user => {
                    if (user) {
                        
                        bcrypt.hash(params.newPassword, 2).then((hash) => {
                            params.newPassword = hash;
                            user.updateAttributes({
                                username: params.newUsername,
                                password: params.newPassword
                            }).then(user => {
                                resolve(user.dataValues);
                            }).catch(err => {
                                reject(responseCodes.internalError);
                            });
                        }).catch((err) => {                              
                            reject(responseCodes.internalError);
                        });   

                        
                    } else {
                        reject(responseCodes.noUserExists);
                    }
                }).catch(err => {
                    reject(responseCodes.internalError);
                });
            }
        });
    },
    deleteUser: function(params){
        return new Promise((resolve, reject) => {
            if(!params.username){
                reject(responseCodes.invalidRequest);
            } else {
                models.user.findOne({
                    where: {
                        username: params.username,
                        id: {
                            [models.Op.ne]: 1
                        }
                    }
                }).then(user => {
                    if(!user){
                        reject(responseCodes.noUserExists);
                    } else {
                        user.updateAttributes({
                            deactivated: true
                        }).then(usr => {
                            resolve(usr.dataValues);
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