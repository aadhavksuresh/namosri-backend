const models = require("../models/models");
const responseCodes = require("../models/responseCodes");

module.exports = {
    addGetInTouch: params => {
        return new Promise((resolve, reject) => {
            models.getInTouch
                .create(params)
                .then(getInTouch => {
                    resolve(getInTouch.dataValues);
                })
                .catch(err => {
                    reject(getInTouch.internalError);
                });
        });
    },
    getAllGetInTouch: function() {
        return new Promise((resolve, reject) => {
            models.getInTouch
                .findAll()
                .then(getintouch => {
                    resolve(getintouch);
                })
                .catch(err => {
                    reject(responseCodes.internalError);
                });
        });
    },
    getOneGetInTouch: function(id) {
        return new Promise((resolve, reject) => {
            models.getInTouch
                .findOne({
                    where: {
                        id: id
                    }
                })
                .then(getInTouch => {
                    resolve(getInTouch);
                })
                .catch(err => {
                    reject(responseCodes.internalError);
                });
        });
    }
};
