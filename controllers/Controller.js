var myApp = angular.module('atoz', []);
myApp.controller('atozController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {


$scope.fetchService = function(){
    var dataObj = {
        token : $cookies.get('token')
    };
    var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };
  $http.post('http://ec2-34-216-106-44.us-west-2.compute.amazonaws.com:8080/atoz//v1/user/fetchService',dataObj,config).success(function(response){
    $scope.fetchServiceResponse = response;
    console.log(response);
  });  
};





$scope.fd = function(principal,rate,duration,monthOrYear,compoundingFreq){
  $http.get('http://ec2-34-216-106-44.us-west-2.compute.amazonaws.com:8080/atoz/v1/fd?p='+principal+'&r='+rate+'&t='+duration+'&type='+monthOrYear+'&cType='+compoundingFreq).success(function(response){
    $scope.fdResponse = response;
    console.log(response);
  });  
};

$scope.rd = function(principal,rate,duration,monthOrYear,compoundingFreq){
  $http.get('http://ec2-34-216-106-44.us-west-2.compute.amazonaws.com:8080/atoz/v1/rd?p='+principal+'&r='+rate+'&t='+duration+'&type='+monthOrYear+'&cType='+compoundingFreq).success(function(response){
    $scope.rdResponse = response;
    console.log(response);
  });  
};

$scope.pincodeDetail = function(pincode){
  $http.get('http://ec2-34-216-106-44.us-west-2.compute.amazonaws.com:8080/atoz/v1/pincode?pincode='+pincode).success(function(response){
    $scope.pincodeResponse = response;
    console.log(response);
  });  
};

$scope.bankDetail = function(){
	$http.get('http://ec2-34-216-106-44.us-west-2.compute.amazonaws.com:8080/atoz/v1/fetchBankDetail').success(function(response){
    $scope.bankResponse = response;
    console.log(response);
  });
};

$scope.stateDetail = function(bankId){
	$http.get('http://ec2-34-216-106-44.us-west-2.compute.amazonaws.com:8080/atoz/v1/fetchBankDetail?bankId='+bankId).success(function(response){
    $scope.stateResponse = response;
    console.log(response);
  });
};

$scope.districtDetail = function(bankId,stateId){
	$http.get('http://ec2-34-216-106-44.us-west-2.compute.amazonaws.com:8080/atoz/v1/fetchBankDetail?bankId='+bankId+'&stateId='+stateId).success(function(response){
    $scope.districtResponse = response;
    console.log(response);
  });
};

$scope.cityDetail = function(bankId,stateId,districtId){
	$http.get('http://ec2-34-216-106-44.us-west-2.compute.amazonaws.com:8080/atoz/v1/fetchBankDetail?bankId='+bankId+'&stateId='+stateId+'&districtId='+districtId).success(function(response){
    $scope.cityResponse = response;
    console.log(response);
  });
};

$scope.branchDetail = function(bankId,stateId,districtId,cityId){
	$http.get('http://ec2-34-216-106-44.us-west-2.compute.amazonaws.com:8080/atoz/v1/fetchBankDetail?bankId='+bankId+'&stateId='+stateId+'&districtId='+districtId+'&cityId='+cityId).success(function(response){
    $scope.branchResponse = response;
    console.log(response);
  });
};


}]);﻿


