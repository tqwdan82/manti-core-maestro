const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback){
        //get resource operations
        let apis = {};
        let resourcePath =  path.join(__dirname, '../../../../','web_modules','resource');
        if (fs.existsSync(resourcePath)) //if the resource directory exists
        {
            //read all resource action directories
            let resourceActionDirs = fs.readdirSync(resourcePath);

            //iterate all resource action directories
            resourceActionDirs.forEach(function(resourceActionDir) {

                //get the action name
                let actionType = resourceActionDir.toUpperCase();

                //get all resource within action
                //form the action directory path
                let actionPath =  path.join(resourcePath, resourceActionDir);

                let resourceFiles = fs.readdirSync(actionPath);
                let resourceFilesFormatted = [];
                resourceFiles.forEach(function(resourceFile) {

                    let resPath = path.join(actionPath, resourceFile);
                    let apiDetails;
                    let returnApiDetails = {};
                    if (require.cache[resPath])
                    {//if the potential operation is loaded
                        
                        apiDetails = require.cache[resPath].operation.details;

                        //remove the potential operation from memory
                        delete require.cache[resPath];
                    }
                    else
                    {// load the operation
                        let apiOp = require(resPath);
                        apiDetails = apiOp.operation.details;
                        
                        //remove the operation from memory
                        delete require.cache[resPath];
                    }
                    if(typeof apiDetails.description !== "undefined")
                        returnApiDetails.description = apiDetails.description;

                    let resourceName = resourceFile.substring(0, resourceFile.indexOf(".js"));
                    returnApiDetails.apiName = resourceName;
                    returnApiDetails.apiType = "resource";
                    resourceFilesFormatted.push(returnApiDetails);
                });
                apis[actionType] = resourceFilesFormatted;
            });
        }

        //get custom operations
        let allApisPath =  path.join(__dirname, '../../../../','web_modules');
        if (fs.existsSync(allApisPath)) //if the web_modules exists
        {
            //read all api directories
            let allApisDirs = fs.readdirSync(allApisPath);

            //iterate all api directories
            allApisDirs.forEach(function(apisDir) {

                if(apisDir !== "resource")
                {// do not process the resource directory

                    //form the api directory path
                    let apisDirPath =  path.join(allApisPath, apisDir);

                    //read all resource action directories
                    let apiActionDirs = fs.readdirSync(apisDirPath);

                    //iterate all api action directories
                    apiActionDirs.forEach(function(apiActionDir) {

                        //get the action name
                        let actionType = apiActionDir.toUpperCase();

                        //form the action directory path
                        let actionPath =  path.join(apisDirPath, actionType);

                        //get all api action files
                        let apiActionFiles = fs.readdirSync(actionPath);
                        let apiActionFilesFormatted = [];
                        apiActionFiles.forEach(function(apiActionFile) {
                        
                            let resPath = path.join(actionPath, apiActionFile);
                            let apiDetails;
                            let returnApiDetails = {};
                            if (require.cache[resPath])
                            {//if the potential operation is loaded
                                
                                apiDetails = require.cache[resPath].operation.details;

                                //remove the potential operation from memory
                                delete require.cache[resPath];
                            }
                            else
                            {// load the operation
                                let apiOp = require(resPath);
                                apiDetails = apiOp.operation.details;
                                
                                //remove the operation from memory
                                delete require.cache[resPath];
                            }
                            if(typeof apiDetails.description !== "undefined")
                                returnApiDetails.description = apiDetails.description;

                            var actionName = apiActionFile.substring(0, apiActionFile.indexOf(".js"));
                            returnApiDetails.apiName = actionName;
                            returnApiDetails.apiType = "customised";
                            apiActionFilesFormatted.push(returnApiDetails);

                        });

                        apis[actionType] = apiActionFilesFormatted;
                    });
                }
            });
        }

        callback(apis);
    }
};

module.exports = operation;