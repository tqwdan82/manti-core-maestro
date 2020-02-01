//------------------- Resource API New Controller -------------------//
var apiResNew = angular.module('apiResNewApp', []);
apiResNew.controller('apiResNewCtrl', function($scope) {

    $scope.allModels = [];

    $scope.init = function(){
        let httpCallback = function(response){
            let res = JSON.parse(response);
            $scope.$apply(function(){
                Object.keys(res).forEach(function(key)
                {
                    let obj = res[key];
                    obj.model = key;
                    $scope.allModels.push(obj);
                });
            });
        };
        httpGetAsync("../../web/maestro/api/getAllDataModel", {}, httpCallback);
    };

    $scope.generate = function(key){
        console.log("generate key: " +key);
        let httpCallback = function(response){
            console.log(response);
        };
        httpPostAsync("../../web/maestro/api/genResApi", JSON.stringify({model:key}), httpCallback);

    };
    
    $scope.delete = function(key){
        console.log("delete key: " +key);
        let httpCallback = function(response){
            console.log(response);
        };
        httpPostAsync("../../web/maestro/api/delResApi", JSON.stringify({model:key}), httpCallback);

    };

    $scope.init();
});

//------------------- API View Controller -------------------//
var apiViewApp = angular.module('apiViewApp', []);
apiViewApp.controller('apiViewCtrl', function($scope) {

    $scope.resourceApis = [];
    $scope.hasResourceApis = false;
    $scope.customizedApis = [];
    $scope.hasCustomeizedApis = false;
    $scope.dindex = 0;

    $scope.init = function(){
        let httpCallback = function(response){
            let res = JSON.parse(response);
            $scope.$apply(function(){
                
                $scope.resourceApis = res.resource;
                $scope.hasResourceApis = res.resource.length > 0 ? true:false;
                $scope.customizedApis = res.customized;
                $scope.hasCustomeizedApis = res.customized.length > 0 ? true:false;
            });
        };
        httpGetAsync("../../web/maestro/api/getApis", {}, httpCallback);
    };

    
    $scope.init();
    
});