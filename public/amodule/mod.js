var mod = angular.module('restmod',[]);

mod.controller("rest",['httpservice','$scope',function(httpservice,$scope){
    $scope.pattern="";
    $scope.companies =[];
    $scope.readpattern = function(){
     console.log($scope.pattern);
     httpservice.getCompanies($scope.pattern);
    }
}]);


mod.service('httpservice',['$http',function($http){             //to call a rest api
    this.getCompanies = function(pattern){
        $http.get("http://localhost:4780/mongo-api/cnames/"+pattern).then(
            (data)=>{console.log(data)},                                            //if successful
            (error)=>{console.log(error)}                                           //if error
        );

    }
    
}]);