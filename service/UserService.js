'use strict';

var sender = require('../managers/communication.js');
var params = require('../util/parameters.js');

var body;


/**
 * Gets a list of favourite music genres
 *
 * technology String Choose firebase or mqtt
 * returns MusicArray
 **/
var paramsgetMusic=[];
module.exports.getMusic = function(req, res, next) {

    body={}
    body=params.getParams(req,paramsgetMusic)
    sender.sendRequest(body,'User','getMusic',res);

};


/**
 * Gets the environment temperature
 * returns Temperature
 **/
var paramsgetTemperature=[];
module.exports.getTemperature = function(req, res, next) {

    body={}
    body=params.getParams(req,paramsgetTemperature)
    sender.sendRequest(body,'User','getTemperature',res);

};



