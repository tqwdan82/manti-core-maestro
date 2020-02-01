const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback){
        //get resource operations
        let generatedDataModels = [];
        let resourcePath =  path.join(__dirname, '../../../../','web_modules','resource');
        if (fs.existsSync(resourcePath)) //if the resource directory exists
        {
            //read all resource action directories
            let resourceActionDirs = fs.readdirSync(resourcePath);

            //iterate all resource action directories
            resourceActionDirs.forEach(function(resourceActionDir) {

                //get all resource within action
                //form the action directory path
                let actionPath =  path.join(resourcePath, resourceActionDir);

                let resourceFiles = fs.readdirSync(actionPath);
                resourceFiles.forEach(function(resourceFile) {
                    let resourceName = resourceFile.substring(0, resourceFile.indexOf(".js"));
                    generatedDataModels.push(resourceName);
                });

            });
        }

        let handler = function(response){
            let returnData = {};
            Object.keys(response).forEach(function(key)
            {
                returnData[key] = {
                    generated:false
                };

            });

            generatedDataModels.forEach(function(genDataModel)
            {
                if(typeof returnData[genDataModel] !== 'undefined')
                    returnData[genDataModel].generated = true;
            });

            callback(returnData);
        };
        serviceManager.callOperation("maestro", "dataModel", "getCachedDataModelOperation", {}, handler);
        
    }
};

module.exports = operation;