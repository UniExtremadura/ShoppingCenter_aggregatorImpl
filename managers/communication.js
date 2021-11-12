'use strict';

var vars = require('../index');
var AGG = require('../aggregator.js');
var dataManager=require('./data')

var mqttApp = vars.mqttApp;
var topicDevices = vars.topicDevices;
var sender= vars.topicAggregator;


var result;
var idRequest=0;
var reqMap = new Map();


//TODO: Change timeOutValue if necessary
var timeOutValue = 1000;

var optionsMqtt={
    "resource": "",
    "method": "",
    "sender":"",
    "idRequest": 0,
    "params": {

        }
  };

exports.sendRequest = function (body, resource, method, res){
    var id=idRequest
    idRequest++

    optionsMqtt.resource=resource;
    optionsMqtt.method=method;
    optionsMqtt.idRequest=id;
    optionsMqtt.sender=sender
    optionsMqtt.params=body;

    console.log(optionsMqtt)

    dataManager.createRequest(id);
    reqMap.set(id, { res: res, method: method, body: body});

    //TODO: Change if necessary by your configuration
    mqttApp.publish(topicDevices, JSON.stringify(optionsMqtt));

    sendResult(id)
    
}


function sendResult(id){
    var obj;
    var res;
    var method;
    var params

    setTimeout(function(){
        obj = reqMap.get(id);
        res=obj.res;
        method=obj.method;
        params= obj.body;

        result=dataManager.getResult(id, method, params);
        reqMap.delete(id);


        if (result.length > 0) {

            result=AGG.aggregate(result,method);


            res.contentType('application/json');
            res.status(200).send(result);
            
         } else{
            res.contentType('text/plain');
            res.status(204).end();             
         }

    }, timeOutValue);
}