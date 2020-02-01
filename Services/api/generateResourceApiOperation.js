const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback){
        
        let svcData = {
            model:inputs
        };

        //check operations
        // let resourcePath =  path.join(__dirname, '../../../../','web_modules','resource');
        let appDir = path.join(__dirname,"../../../..","app_modules","resource",inputs);
        if (!fs.existsSync(appDir)) //if the operation directory exists
        {
            //indicate to create the operations
            svcData.genDaoInd = true;
        }
        
        //indicate to create the api
        svcData.genApiInd = true;

        let genApiDaoIndHandler = function()
        {
            let returnData = {};
            returnData["status"] = "Ok";
            returnData["details"] = "Generation completed. The APIs will be generated shortly.";
            returnData["data"] = {};
            callback(returnData);
        }
        serviceManager.callOperation("maestro", "api", "generateNewSvcOperation", svcData, genApiDaoIndHandler);

    }
};

module.exports = operation;