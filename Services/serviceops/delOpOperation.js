const fs = require('fs')
const path = require('path')


const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){

        let opSvcPath =  path.join(__dirname, '../../../../','app_modules',inputs.application, inputs.service, inputs.operation+".js");
        if (fs.existsSync(opSvcPath)) //if the app modules directory exists
        {
            try {
                fs.unlinkSync(opSvcPath);
            } catch(err) {
                console.error("Operation delete error: " + err)
            }
        }

        let returnData ={};
        returnData["status"] = "Ok";
        returnData["details"] = "Operation delete completed.";
        returnData["data"] = inputs;
        callback(returnData);
        
    }
};

module.exports = operation;