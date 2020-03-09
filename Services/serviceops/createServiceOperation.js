const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){
        
        let appPath = path.join(__dirname,"../../../../app_modules", inputs.application, inputs.service);
        if (!fs.existsSync(appPath)){
            fs.mkdirSync(appPath);
        }

        let returnData = {};
        returnData["status"] = "Ok";
        returnData["details"] = "Service creation completed.";
        returnData["data"] = inputs;

        callback(returnData);
        
    }
};

module.exports = operation;