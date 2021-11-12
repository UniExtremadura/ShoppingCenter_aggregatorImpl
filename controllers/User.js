'use strict';

var User = require('../service/UserService');

module.exports.getMusic = function getMusic (req, res, next) {

    User.getMusic(req.swagger.params, res, next);

};

module.exports.getTemperature = function getTemperature (req, res, next) {

    User.getTemperature(req.swagger.params, res, next);

};
