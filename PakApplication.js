const fs = require('fs')
const path = require('path')


const pakDetails = {
    "AI_Enabled": false,
    "VI_Enabled": false,
    "WI_Enabled": false,
    "DBI_Enabled": false,
    "Name":"Manti-core Maestro Management Module Package",
    "Description": "This is a management module that helps administrators to management data models and service APIs.",
    "WebContext": "maestro",
    "AppName": "maestro"
}

const init = function(dbMgr, svcMgr, webMgr){
    PakManager.dbMgr = dbMgr;
    PakManager.svcMgr = svcMgr;
    PakManager.webMgr = webMgr;

    //look at all the services and operations
    let svcsPath =  path.join(__dirname, 'Services');
    if (fs.existsSync(svcsPath)) //if the services directory exists
    {
        //get all contexts
        let services = fs.readdirSync(svcsPath);
        //iterate all services
        services.forEach(function(service) {

            let svcDirPath = path.join(svcsPath, service)
            //read and iterate the service for all the operations
            let operations = fs.readdirSync(svcDirPath);
            //iterate all operations to slice the extention
            let returnOperations = [];
            operations.forEach(function(operation) {
                // console.log(svcDirPath, operation);
                var opName = operation.substring(0, operation.indexOf(".js"));
                returnOperations.push(opName);
            });

            //register the service and operations
            svcMgr.ServiceManager.registerPackageService(
                svcsPath,
                pakDetails.AppName,
                service,
                returnOperations
            );

        });
    }

    //look at all web app contexts
    let webAppContextsPath =  path.join(__dirname, 'WebApp', "views");
    //get all other scripts and css directories
    let scriptDirs = [];
    if (fs.existsSync(webAppContextsPath)) //if the web app directory exists
    {
        //get all contexts
        let contexts = fs.readdirSync(webAppContextsPath);
        //iterate all context to add scripts and css directoryu
        contexts.forEach(function(context) {
            scriptDirs.push(path.join(webAppContextsPath, context,"main","script"));
            // scriptDirs.push(path.join(webAppContextsPath, context,"main","css"));
            //scriptDirs.push(path.join(webAppContextsPath, context,"pages"));
        });
    }

    //TODO: Implement to create resource folder in app_modules and web_modules if do not exist

    
    PakManager.webMgr.registerRoute('/resources/:model', 'get', 
        function(req,res)
        {
            var callScript = req.params.model + ".js";
            // logger.info('Incoming GET request for resource ' + callScript + "...");
            var operationPath = path.join(__dirname,"../../", 'web_modules', 'resource', 'GET', callScript);
            PakManager.webMgr.performFileOperation(operationPath, req, res);
        }
    );
    //TODO: register other resource paths
    //route action for GET resource handlers
    // router.get('/resource/:model/:pk', function (req, res) {
        //get the service and web operation
        // var callDir = req.params.service;
        // var callScript = req.params.operation + ".js";
        // logger.info('Incoming GET request for ' + callDir + "." + callScript + "...");
        // //formulates the path to the script
        // var operationPath = path.join(__dirname,"../", 'web_modules', callDir, 'GET', callScript);

        // //calls the common web handler function with the path and the request and response object
        // fileOperation(operationPath, req, res);
    // });

    //route action for GET resource handlers
    // router.get('/resource/:model/:attr/:value', function (req, res) {
        //get the service and web operation
        // var callDir = req.params.service;
        // var callScript = req.params.operation + ".js";
        // logger.info('Incoming GET request for ' + callDir + "." + callScript + "...");
        // //formulates the path to the script
        // var operationPath = path.join(__dirname,"../", 'web_modules', callDir, 'GET', callScript);

        // //calls the common web handler function with the path and the request and response object
        // fileOperation(operationPath, req, res);
    // });
    

    //register the view with the platform
    PakManager.webMgr.registerView({
        contextPath: pakDetails.WebContext,
        directory: webAppContextsPath,
        miscellaneous: scriptDirs
    });
}

const PakManager = {
    init:init,
    pakDetails:pakDetails
};

module.exports = PakManager;