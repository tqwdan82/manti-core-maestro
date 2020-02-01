const fs = require('fs')
const path = require('path')
let ejs = require('ejs')

const operation = {
    loadOperation: function(serviceManager, inputs, callback){
        
        let returnData = {};

        let modelToGenerate = inputs.model;
        
        if(inputs.genDaoInd)
        {
            //generate the DAO service
            let templateFilePath = path.join(__dirname,"../..","util","daoTemplate","findOperation.template");
            ejs.renderFile(templateFilePath, {model:modelToGenerate}, {}, 
                function(err, str){
                    if(!err)
                    {
                        let appDir = path.join(__dirname,"../../../..","app_modules","resource");
                        //check if app directory exists
                        if(!fs.existsSync(appDir))
                        {//if the app directory does not exists
                            //create app directory
                            fs.mkdirSync(appDir);
                        }
                        
                        let actualFileDir = path.join(__dirname,"../../../..","app_modules","resource", modelToGenerate);
                        //check if model directory exists
                        if(!fs.existsSync(actualFileDir))
                        {//if the model directory does not exists
                            //create model directory
                            fs.mkdirSync(actualFileDir);
                        }
                        
                        let actualFilePath = path.join(__dirname,"../../../..","app_modules","resource", modelToGenerate, "findOperation.js");
                        fs.writeFileSync(actualFilePath, str);
                        return;
                    }
                    console.log("Error encountered! Err: " + err);
            });
        }

        if(inputs.genApiInd)
        {

            //generate the API service
            let getApiTemplateFilePath = path.join(__dirname,"../..","util","apiTemplate","getResource.template");
            ejs.renderFile(getApiTemplateFilePath, {model:modelToGenerate}, {}, 
                function(err, str){
                    if(!err)
                    {
                        let getDir = path.join(__dirname,"../../../..","web_modules","resource","GET");
                        let actualGetPath = path.join(getDir, modelToGenerate + ".js");
                        
                        //check if app directory exists
                        if(!fs.existsSync(getDir))
                        {//if the app directory does not exists
                            //create app directory
                            fs.mkdirSync(getDir);
                        }

                        fs.writeFileSync(actualGetPath, str);
                        return;
                    }
                    console.log("Error encountered! Err: " + err);
            });
        }
        
        
        callback(returnData);
        
    }
};

module.exports = operation;