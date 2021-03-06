const fs = require('fs')
const path = require('path')

function deleteDirContent(inPath){
  let dirPaths = fs.readdirSync(inPath);
  dirPaths.forEach(function(dirPath){

      let abPath = path.join(inPath, dirPath);
      if(fs.lstatSync(abPath).isDirectory()){
          deleteDirContent(abPath);
          try {
              fs.rmdirSync(abPath);
          } catch(err) {
              console.error("Dir delete error: " + err)
          }
      }else{
          try {
              fs.unlinkSync(abPath);
          } catch(err) {
              console.error("File delete error: " + err)
          }
      }
  });
}

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){
        
      //delete the application
      let appPath = path.join(__dirname,"../../../../app_modules",inputs.application);
      if (fs.existsSync(appPath)) //if the app modules directory exists
        {
            deleteDirContent(appPath);
            try {
                fs.rmdirSync(appPath);
            } catch(err) {
                console.error("Svc Dir delete error: " + err)
            }
        }

        let returnData ={};
        returnData["status"] = "Ok";
        returnData["details"] = "Application delete completed.";
        returnData["data"] = inputs;
        callback(returnData);
        
    }
};

module.exports = operation;