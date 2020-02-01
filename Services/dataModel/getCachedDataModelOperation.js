const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback){

        callback(serviceManager.callDBOperation.getAllModels());
        
    }
};

module.exports = operation;