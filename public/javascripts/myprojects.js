var app = angular.module("vizard", []);
app.controller("homeCtrl", function ($scope, $http, $window) {

$scope.powerOff = function()
{
    sessionStorage.clear();
    window.location="login";
}


});