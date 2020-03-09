const fs = require('fs')
const path = require('path')

function exists(array, value){

    let found = false;
    array.forEach(function(item){
        if(item === value){
            found |= true;
        }
    });

    return found;
}

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){
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
                    if(!exists(generatedDataModels, resourceName))
                        generatedDataModels.push(resourceName);
                });

            });
        }

        let allDataModels = [];
        let modelsPath =  path.join(__dirname, '../../../../','models');
        if (fs.existsSync(modelsPath)) //if the models directory exists
        {
            //read all resource action directories
            let modelPaths = fs.readdirSync(modelsPath);

            //iterate all model
            modelPaths.forEach(function(modelPath) {
                let model = modelPath.substring(0, modelPath.indexOf(".js"));
                allDataModels.push(model);
            });

        }

        let returnData = {};
        allDataModels.forEach(function(key)
        {
            // let models = allDataModels.models;
            // let modelKeys = Object.keys(models);
            if(exists(generatedDataModels, key)){
                returnData[key] = {generated:true};
            }else{
                returnData[key] = {generated:false};
            }

        });

        callback(returnData);
        
    }
};

module.exports = operation;