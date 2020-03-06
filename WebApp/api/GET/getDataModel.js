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
        var handler = function(data){
            httpObj.responseData = {"data":data}; //set the response data
            httpObj.completeHttpResponse(httpObj); // respond to the http call   
        }
        serviceManager.callOperation("maestro", "dataModel", "getDataModelOperation", {}, handler, httpObj.request.mcHeader);
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
