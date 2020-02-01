const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback){
        
        let modeName = inputs.modelName;
        delete inputs.modelName;

        let data = JSON.stringify(inputs);
        let modelPath = path.join(__dirname,"../../../../models",modeName+'.json');
        fs.writeFileSync(modelPath, data);

        let returnData = {};
        returnData["status"] = "Ok";
        returnData["details"] = "Model creation completed. The table and data will be created shortly.";
        returnData["data"] = inputs;

        callback(returnData);
        
    }
};

module.exports = operation;