const fs = require('fs')
const path = require('path')


const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){

        let opSvcPath =  path.join(__dirname, '../../../../','app_modules',inputs.application, inputs.service, inputs.operation+".js");
        if (fs.existsSync(opSvcPath)) //if the app modules directory exists
        {
            try {
                fs.writeFileSync(opSvcPath, inputs.content)
            } catch(err) {
                console.error("Operation save error: " + err)
            }
        }else{
            try {
                fs.writeFileSync(opSvcPath, inputs.content)
            } catch(err) {
                console.error("Operation save error: " + err)
            }
        }

        let returnData ={};
        returnData["status"] = "Ok";
        returnData["details"] = "Operation save completed.";
        returnData["data"] = inputs;
        callback(returnData);
        
    }
};

module.exports = operation;