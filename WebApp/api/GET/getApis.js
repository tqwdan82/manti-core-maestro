/** 
 * 
 **/
//server libraries
const utils = require('../../../../../server/util/utils.js');
const logger = utils.logger() // logger object

//operation object
const operation = {
    /** 
     * 
     * Header configuration requirement
     * modify this based on the requirements
     * 
     * 
    */
    headerConfig : {},
    /** 
     * 
     * Input data validation
     * modify this based on the requirements
     * 
     * 
    */
    inputValidation : function(data)
    {
        var check = true;
        return check;
    },
    //operation object
    loadWebOperation: function(serviceManager, httpObj)
    {
        //operation implementation
        
        /** 
         * 
         * OPERATION IMPLEMENTATION STARTS HERE
         * 
         * 
        */
        let dataFormatter = function(inData)
        {
            let returnData = {
                resource:[],
                customized:[]
            };

            //action type loop
            Object.keys(inData).forEach(function(actionType)
            {
                //get the list of APIs by the action type
                let apis = inData[actionType];
                
                //iterate all the apis
                apis.forEach(function(api)
                {
                    let apiName = "";
                    let apiType = "";
                    let apiDescription = "";
                    //api details loop
                    Object.keys(api).forEach(function(apiDescriptor)
                    {
                        if(apiDescriptor === 'apiName')
                        {
                            apiName = api[apiDescriptor];
                        }

                        if(apiDescriptor === 'apiType')
                        {
                            apiType = api[apiDescriptor];
                        }

                        if(apiDescriptor === 'description')
                        {
                            apiDescription = api[apiDescriptor];
                        }
                    });
                    
                    if(apiType === 'resource')
                    { // if the API type is a resource
                        
                        returnData.resource.push({
                            name:apiName,
                            description: apiDescription,
                            get: [
                                "/web/resource/"+apiName,
                                "/web/resource/"+apiName+"/{id}",
                                "/web/resource/"+apiName+"/{attribute}/{attribute value}",
                            ]
                        });
                        
                    }
                    else
                    {

                    }
                    //returnData[apiName].get
                    // if(returnData[a])
                });
            });

            return returnData;
        };
        
        var handler = function(data){
            
            httpObj.responseData = {"data":dataFormatter(data)}; //set the response data
            httpObj.completeHttpResponse(httpObj); // respond to the http call   
        }
        serviceManager.callOperation("maestro", "api", "getApiOperation", {}, handler, httpObj.request.mcHeader);
        /** 
         * 
         * OPERATION IMPLEMENTATION ENDS HERE
         * 
         * 
        */
    }
    
}

module.exports = {
    operation:operation
};
