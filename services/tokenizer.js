
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const responseCode = require('../models/responseCodes');

module.exports = {

    getToken: function(user) {
        const expiresIn = 2 * 60 * 60 // 2 hrs
        const token = jwt.sign({
            username: user.username,
            id: user.id,
            email: user.email
        }, config.superSecret, {
            expiresIn: expiresIn
        });
        return token;
    },
    varifyUser: function(token) {
        return new Promise((resolve , reject)=> {
            jwt.verify(token, config.superSecret
            , function(err, decoded) {
                if(err){
                    reject(responseCode.unAuthorized);
                }else{
                    resolve ({ status: true, data : decoded  });
                }
            });
        })
        
    },
    isInt: function(value) {
        return !isNaN(value) 
                && (parseInt(Number(value)) == value) 
                && (!isNaN(parseInt(value, 10)));
    },
    getUserInfoFromHeader: function(req){
        reqHeader = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString('ascii');
        return {
            username: reqHeader.split(':')[0],
            password: reqHeader.split(':')[1]
        }
    }
};