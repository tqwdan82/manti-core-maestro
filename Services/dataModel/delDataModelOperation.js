const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback){
        
        let modelPath = path.join(__dirname,"../../../../models",inputs.model+'.json');
        let returnData = {};
        if (fs.existsSync(modelPath)) //if the model exists
        {
            try {
                fs.unlinkSync(modelPath)
                //file removed

              } catch(err) {
                console.error("Model delete error: " + err)
                // logger.error("Model delete error: " + err);
                returnData["status"] = "Failed";
                returnData["details"] = "Delete Failed. Error: " + err;
                returnData["data"] = inputs;
              }
              
        }

        returnData["status"] = "Ok";
        returnData["details"] = "Delete completed. The table and data will be deleted shortly.";
        returnData["data"] = inputs;

        callback(returnData);
        
    }
};

module.exports = operation;