var app = angular.module("vizard", []);
app.controller("loginCtrl", function ($scope, $http, $window) {


    $scope.usersData = [];


    $scope.signIn = function (username, password) {
        var alreadyPresent = "nope";
        $http({
            method: 'GET',
            url: '/vizard/usersData',
            'Content-Type': 'application/json'
        }).then(function successCallback(response) {
            $scope.usersData = response.data;
            for(var i=0;i<$scope.usersData.length;i++)
            {
                if($scope.usersData[i].username == username && $scope.usersData[i].password == password)
                {
                    alreadyPresent = "yup";
                    sessionStorage.setItem("identifier", $scope.usersData[i].identifier);
                }
            }
            if(alreadyPresent == "yup")
            {
                window.location="myprojects";
            }
            else{
                window.location="login";
            }
        });
        
    }

    $scope.signUp = function (username, password) {
        var xVar = 0;
        var alreadyPresent = "nope";
        $http({
            method: 'GET',
            url: '/vizard/usersData',
            'Content-Type': 'application/json'
        }).then(function successCallback(response) {
            $scope.usersData = response.data;
            for(var i=0;i<$scope.usersData.length;i++)
            {
                xVar += 1;
                if($scope.usersData[i].username == username && $scope.usersData[i].password == password)
                {
                    alreadyPresent = "yup";
                }
            }
            if(alreadyPresent == "nope")
            {
                $scope.usersData.push({"username":username, "password":password,"identifier":xVar})
            }
    
            var parameter = angular.toJson($scope.usersData);
            $http({
                url: '/vizard/usersData',
                method: "POST",
                data: parameter,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(function (response) { window.location="login"}, function (response) { });
        },
            function errorCallback(response) {
            });
        
    }

});