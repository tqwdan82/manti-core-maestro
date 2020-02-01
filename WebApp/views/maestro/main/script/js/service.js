//------------------- Service API New Controller -------------------//
var svcNew = angular.module('svcNewApp', []);
svcNew.controller('svcNewCtrl', function($scope) {

    $scope.init = function(){
        // let httpCallback = function(response){
        //     let res = JSON.parse(response);
        //     $scope.$apply(function(){
        //         Object.keys(res).forEach(function(key)
        //         {
        //             let obj = res[key];
        //             obj.model = key;
        //             $scope.allModels.push(obj);
        //         });
        //     });
        // };
        // httpGetAsync("../../web/maestro/api/getAllDataModel", {}, httpCallback);
    };


    $scope.init();
});

//------------------- Service View Controller -------------------//
var svcViewApp = angular.module('svcViewApp', []);
svcViewApp.controller('svcViewCtrl', function($scope) {
    $scope.appServices = [];
    $scope.hasAppServices = false;
    $scope.init = function(){
        let httpCallback = function(response){
            let res = JSON.parse(response);
            $scope.$apply(function(){
                
                $scope.appServices = res;
                $scope.hasAppServices = Object.keys(res).length > 0;
            });
        };
        httpGetAsync("../../web/maestro/api/getAllServices", {}, httpCallback);
    };

    
    $scope.init();
    
});