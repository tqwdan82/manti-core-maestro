const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){
        
        let returnData = {};
        let modelsPath = path.join(__dirname,"../../../../models");
        if (fs.existsSync(modelsPath)) //if the models directory exists
        {
            //read all models application directories
            var models = fs.readdirSync(modelsPath);
        
            //iterate all models
            models.forEach(function(model) {
                let modelPath = path.join(modelsPath, model);
                let modelName = model.substring(0, model.indexOf(".json"));
                let rawdata = fs.readFileSync(modelPath);
                let modelData = JSON.parse(rawdata);

                returnData[modelName] = modelData;
            });
        }
        callback(returnData);
        
    }
};

module.exports = operation;