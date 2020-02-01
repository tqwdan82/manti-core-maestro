const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback){
        
        let deletedItems = [];
        let returnData = {};

        //get resource operations
        let resourcePath =  path.join(__dirname, '../../../../','web_modules','resource');
        if (fs.existsSync(resourcePath)) //if the resource directory exists
        {
            //read all resource action directories
            let resourceActionDirs = fs.readdirSync(resourcePath);

            //iterate all resource action directories
            resourceActionDirs.forEach(function(resourceActionDir) {
                let action = resourceActionDir;
                //get all resource within action
                //form the action directory path
                let apiPath =  path.join(resourcePath, resourceActionDir, inputs+".js");
                if (fs.existsSync(apiPath)) //if the api file exists
                {
                    try {
                        fs.unlinkSync(apiPath)
                        //file removed
                        deletedItems.push(action + "/" +inputs);
        
                      } catch(err) {
                        console.error("Model delete error: " + err)
                        // logger.error("Model delete error: " + err);
                        returnData["status"] = "Failed";
                        returnData["details"] = "Delete Failed. Error: " + err;
                        returnData["data"] = inputs;
                      }
                }

            });
        }

        returnData["status"] = "Ok";
        returnData["details"] = "Delete completed. The APIs will be deleted shortly.";
        returnData["data"] = deletedItems;

        callback(returnData);
    }
};

module.exports = operation;