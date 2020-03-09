const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){
        
      //delete the model
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
              returnData["details"] = "Model delete failed. Error: " + err;
              returnData["data"] = inputs;
            }
      }

      //delete model web api
      let webApiPath = path.join(__dirname,"../../../../web_modules","resource");
      if (fs.existsSync(webApiPath)) //if the web api path exist
      {
        //read all action method directory
        let actionDirs = fs.readdirSync(webApiPath);

        //iterate all resource action directories
        actionDirs.forEach(function(actionDir) {

          let webApiActionPath = path.join(webApiPath, actionDir);
          let webApiResPath = path.join(webApiActionPath, inputs.model+".js");
          if (fs.existsSync(webApiResPath)){ //if the action file exists
            try {
              fs.unlinkSync(webApiResPath)
              //file removed

            } catch(err) {
              console.error("API delete error: " + err)
              returnData["status"] = "Failed";
              returnData["details"] = "API delete failed. Error: " + err;
              returnData["data"] = inputs;
            }
          }
        });
      }

      //delete model service & operation
      let svcPath = path.join(__dirname,"../../../../app_modules","resource", inputs.model);
      if (fs.existsSync(svcPath)) //if the service path exist
      {
        //read all operations
        let operations = fs.readdirSync(svcPath);
        //iterate all operations
        operations.forEach(function(operation) {
          let operationPath = path.join(svcPath, operation);
          try {

            fs.unlinkSync(operationPath);
            //file removed
  
          } catch(err) {
            console.error("Operation delete error: " + err)
            returnData["status"] = "Failed";
            returnData["details"] = "Operation delete failed. Error: " + err;
            returnData["data"] = inputs;
          }

        });

        try {
          fs.rmdirSync(svcPath);
          //file removed
  
        } catch(err) {
          console.error("Service delete error: " + err)
          returnData["status"] = "Failed";
          returnData["details"] = "Service delete failed. Error: " + err;
          returnData["data"] = inputs;
        }

      }
      

      
      returnData["status"] = "Ok";
      returnData["details"] = "Delete completed. The table and data, web api, serivce and operation will be deleted shortly.";
      returnData["data"] = inputs;

      callback(returnData);
        
    }
};

module.exports = operation;