const validation = require('./validation');
const models = require('../models/models');
const bcrypt = require('bcrypt');

module.exports = {
//  ============= used by admin only for providing access to another user===============
    signup: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.username || !params.password) {
                reject('Fill are parameters');
            } else {
                validation.userExists(params.username)
                    .then(result => {
                        if (result) {
                            reject('Username exists');
                        } else { 
                            bcrypt.hash(params.password, 2).then((hash) => {
                                params.password = hash;
                                models.user.create(params).then(user => {
                                    resolve(user.dataValues);
                                }).catch((err) => {
                                    console.error('Error occured while creating user:', err);
                                    reject('Server side error');
                                });
                            }).catch((err) => {
                                console.error('Error encrypting password', err);
                                reject('Server side error');
                            });             
                        }
                    }).catch(err => {
                        console.error('User validation error', err);
                        reject('Server side error');
                    });
            }
        });
    },
// ============================= login user =================================
    loginUser: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.username || !params.password) {
                reject('Missing params');
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
                                                reject('Password mismatch');
                                            }
                                    }).catch((err) => {
                                        console.error('Error decrypting password', err);
                                        reject('Server side error');
                                    });
                                }
                            }).catch(err => {
                                reject('Server side Error');
                            })
                        } else {
                            reject('User does not exist');
                        }
                    }).catch(err => {
                        console.error('User validation error', err);
                        reject('Server side error');
                    });
            }
        });
    },
//  ============== get user information =============
    getUser: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.username) {
                reject('Invalid Request');
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
                                reject('Server side Error');
                            })
                        } else {
                            reject('User does not exist');
                        }
                    }).catch(err => {
                        console.error('User validation error', err);
                        reject('Server side error');
                    });
            }
        });
    },
//  ================= update user values =================
    updateUser: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.username) {
                reject('Missing Params');
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
                                console.error('Error occured at saveUser', err);
                                reject('Server side error');
                            });
                    } else {
                        reject('No such User exist');
                    }
                }).catch(err => {
                    console.error('Error occured at saveUser', err);
                    reject('Server side error');
                });
            }
        });
    }
};