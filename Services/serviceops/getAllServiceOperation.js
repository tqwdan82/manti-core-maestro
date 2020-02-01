const fs = require('fs')
const path = require('path')

const operation = {
    loadOperation: function(serviceManager, inputs, callback){
        //get service
        let returnApps = [];
        let appPath =  path.join(__dirname, '../../../../','app_modules');
        if (fs.existsSync(appPath)) //if the app modules directory exists
        {
            //read all app directories
            let appDirs = fs.readdirSync(appPath);

            //iterate all app directories
            appDirs.forEach(function(appDir) {
                
                //form the app services path
                let appDirPath = path.join(appPath, appDir);
                //get all services
                let svcs = fs.readdirSync(appDirPath);
                let services = [];
                svcs.forEach(function(svc)
                {
                    //form the service path
                    let svcPath = path.join(appDirPath, svc);

                    //get all operations
                    let ops = fs.readdirSync(svcPath);
                    let opNames = [];

                    //iterate to formulate the operation without extension
                    ops.forEach(function(op)
                    {
                        opNames.push( op.substring(0, op.indexOf(".js")) );
                    });

                    let svcData = {
                        serviceName: svc,
                        operations: opNames
                    };
                    services.push(svcData);
                });

                let appData = {
                    app: appDir,
                    services: services,
                };
                returnApps.push(appData);
                
            });
        }

        callback(returnApps);
        
    }
};

module.exports = operation;