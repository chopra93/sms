var myApp = angular.module('sms', ['ngCookies']);
var url = "http://35.164.3.27:8081/sms";

myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
             headers: {'Content-Type': undefined}
        })
        .then(function(){
             window.alert("Uploaded successfully");
        });
    }
}]);

myApp.controller('smsController', ['$scope', '$http', '$cookies', '$window', 'fileUpload',function($scope, $http, $cookies, $window, fileUpload) {
  // $scope.login = function(){
  //     var dataObj = {
  //         username : $scope.username,
  //         pwd : $scope.pwd
  //     };
  //     $http.post(url+'/v1/user/login', JSON.stringify(dataObj)).then(function(response){
  //       $scope.loginResponse = response;
  //       console.log(response);
  //       console.log(response.data.token);
  //       $cookies.put("token", response.data.token);
  //       $window.location.href = 'home.html';
  //   });
  // };

  $scope.login = function(){
      var dataObj = {
          username : $scope.username,
          pwd : $scope.pwd
      };
      $http.post(url+'/v1/user/login', JSON.stringify(dataObj)).then(
        function(response){
          $scope.loginResponse = response;
          console.log(response);
          console.log(response.data.token);
          $cookies.put("token", response.data.token);
          $window.location.href = 'home.html';
        },
        function (response) {
            console.log(response);
            if(response.status==500) {
              window.alert(response.data.message);
            }
        });
  };

  $scope.logout = function(){
    var dataObj = {
        token : $cookies.get('token')
    };
    var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
    };
    $http.post(url+'/v1/user/logout', JSON.stringify(dataObj),config).then(
      function(response){
        $scope.logoutResponse = response;
        console.log(response);
        console.log(response.message);
        $cookies.remove('token');
        $window.location.href = 'index.html';
      },
      function (response) {
          console.log(response);
          if(response.status==500) {
            window.alert(response.data.message + " Please login again!!");
            $cookies.remove('token');
            $window.location.href = 'login.html';
          }
      });
    };

  $scope.fetchService = function(){
    var dataObj = {
        token : $cookies.get('token')
    };
    var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };
    $http.post(url+'/v1/user/fetchService',JSON.stringify(dataObj),config).then(
      function(response){
        $scope.fetchServiceResponse = response;
        console.log(response);
      },
      function (response) {
          console.log(response);
          if(response.status==500) {
            window.alert(response.data.message + " Please login again!!");
            $window.location.href = 'login.html';
          }
      });  
  };

  $scope.checkToken = function(){
      var token = $cookies.get('token');
      if (token == null) {
        window.alert("Please login again!!");
        $window.location.href = 'login.html';
      };
  };

  $scope.checkUserName = function(){
    $http.get(url+'/v1/user?phone='+$scope.username).then(function(response){
      $scope.checkUserNameResponse = response;
      console.log(response);
    });  
  };

  $scope.singUp = function(){
    var dataObj = {
          name : $scope.pname,
          username : $scope.phone,
          phone : $scope.phone,
          email : $scope.email,
          pwd : $scope.pwd,
          pwdCompare : $scope.repwd
    };
    var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
    };
    $http.post(url+'/v1/user/signUp', JSON.stringify(dataObj),config).then(
      function(response){
        $scope.signUpResponse = response;
        console.log(response);
        window.alert(response.data + "User Created");
        $window.location.href = 'login.html';
      },
      function (response) {
          console.log(response);
          if(response.status==500) {
            window.alert("Some thing went wrong !! Please try again later");
            $window.location.href = 'signup.html';
          }
      });
  };


  $scope.sendSms = function(){
    var dataObj = {
          token : $cookies.get('token'),
          mobileNo : $scope.phone,
          message : $scope.message,
          type : 'SMS'
    };
    var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
    };
    $scope.loading = true;
    $http.post(url+'/v1/sendSMS', JSON.stringify(dataObj),config).then(
      function(response){
        $scope.sendResponse = response;
        console.log(response);
        $scope.loading = false;
      },
      function (response) {
          console.log(response);
          $scope.loading = false;
          window.alert(response.data.message);
      });
  };

  $scope.upload = function(message){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var token = $cookies.get('token');
        var uploadUrl = url+"/v2/user/upload?message="+message+"&token="+token;
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

  $scope.fetchPayment = function(){
      $http.get(url+'/v1/fetchPayment').then(
      function(response){
        $scope.paymentResponse = response;
        console.log(response);
      },
      function (response) {
          console.log(response);
          if(response.status==500) {
            console.log(response);
          }
      });  
  };  

}]);
