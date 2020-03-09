const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){
        
        let opPath = path.join(__dirname,"../../../../app_modules", inputs.application, inputs.service, inputs.operation+".js");
        let opContent = "";
        if (fs.existsSync(opPath)){
            opContent = fs.readFileSync(opPath, 'utf8');
        }
        
        let returnData = {};
        returnData["status"] = "Ok";
        returnData["details"] = "Service creation completed.";
        returnData["data"] = opContent;

        callback(returnData);
        
    }
};

module.exports = operation;