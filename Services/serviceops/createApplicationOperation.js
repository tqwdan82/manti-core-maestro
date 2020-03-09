const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){
        
        let appPath = path.join(__dirname,"../../../../app_modules",inputs.appName);
        if (!fs.existsSync(appPath)){
            fs.mkdirSync(appPath);
        }

        let returnData = {};
        returnData["status"] = "Ok";
        returnData["details"] = "Application creation completed.";
        returnData["data"] = inputs;

        callback(returnData);
        
    }
};

module.exports = operation;