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
                                    username: params.username
                                }
                            }).then(user => {
                                if (user) {
                                    bcrypt.compare(params.password, user.dataValues.password)
                                        .then(function(res) {
                                            if (res == true) {
                                                console.log(user.dataValues);
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
                        reject(responseCodes.internalError);
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
//  ================= update user values =================
    updateUser: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.username) {
                reject(responseCodes.invalidRequest);
            } else {
                models.user.findOne({
                    where: {
                        username: params.username
                    }
                }).then(user => {
                    if (user) {
                        user.updateAttributes(params)
                            .then(user => {
                                resolve(user.dataValues);
                            }).catch(err => {
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
    }
};