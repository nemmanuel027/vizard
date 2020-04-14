var app = angular.module("vizard", []);
app.controller("newprojectCtrl", function ($scope, $http, $window) {

    $scope.powerOff = function()
    {
        sessionStorage.clear();
        window.location="login";
    }
    
    $scope.Navbar01 = false;
    $scope.Navbar02 = false;
    $scope.selectedItems = [];
    $scope.itemIndex = [];

    $scope.pageOneDisplay = 'yes';
    $scope.pageTwoDisplay = 'no';
    $scope.pageThreeDisplay = 'no';
    $scope.nextPage = function () {
        
    $scope.pageOneDisplay = 'no';
    $scope.pageTwoDisplay = 'yes';
    $scope.pageThreeDisplay = 'no';

        for(var i=0;i<$scope.itemIndex.length;i++)
        {
            if($scope.itemIndex[i] == true)
            {
                $scope.selectedItems.push($scope.items[i])
            }
        }
        
        for(var i=0;i<$scope.selectedItems.length;i++)
        {
            $scope.selectedItems[i]["index"]=i+1;
        }
    }
    $scope.previousPage = function () {
        $scope.pageOneDisplay = 'yes';
        $scope.pageTwoDisplay = 'no';
        $scope.pageThreeDisplay = 'no';

        $scope.selectedItems = [];
    }

    $scope.shiftUp = function(index)
    {
        var i=index-1;
        if(index>1)
        {
            var xTemp = $scope.selectedItems[i-1];
            $scope.selectedItems[i-1] = $scope.selectedItems[i];
            $scope.selectedItems[i] = xTemp;

            $scope.selectedItems[i-1]["index"] = index-1;
            $scope.selectedItems[i]["index"] = index;
        }
    }
    
    $scope.shiftDown = function(index)
    {
        var i=index-1;
        if(index<=$scope.selectedItems.length-1)
        {
            var xTemp = $scope.selectedItems[i+1];
            $scope.selectedItems[i+1] = $scope.selectedItems[i];
            $scope.selectedItems[i] = xTemp;

            $scope.selectedItems[i+1]["index"] = index+1;
            $scope.selectedItems[i]["index"] = index;
        }
    }

    $scope.head = '<!DOCTYPE html><html lang="en"><head><title>Bootstrap Example</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script></head><body>';
    $scope.tail = '</body></html>';

    $scope.items = [
        {
            "id": 0,
            "title": "html1",
            "path": "../htmls_protected/html1.html",
            "innerHtml":'<nav class="navbar navbar-expand-sm bg-light"><ul class="navbar-nav"><li class="nav-item"><a class="nav-link" href="#">Link 1</a></li><li class="nav-item"><a class="nav-link" href="#">Link 2</a></li><li class="nav-item"><a class="nav-link" href="#">Link 3</a></li></ul></nav><br><div class="container-fluid"><h3>Basic Navbar Example</h3><p>A navigation bar is a navigation header that is placed at the top of the page.</p><p>The navbar-expand-xl|lg|md|sm class determines when the navbar should stack vertically (on extra large, large, medium or small screens).</p></div>'
        },
        {
            "id": 1,
            "title": "html2",
            "path": "../htmls_protected/html2.html",
            "innerHtml":'<nav class="navbar navbar-expand-sm bg-dark navbar-dark"><form class="form-inline" action="/action_page.php"><input class="form-control mr-sm-2" type="text" placeholder="Search"><button class="btn btn-success" type="submit">Search</button></form></nav><br><div class="container"><h3>Navbar Forms</h3><p>Use the .form-inline class to align form elements side by side inside the navbar.</p></div>'
           
        }
    ]

$scope.generate = function()
{
    
    $scope.pageOneDisplay = 'no';
    $scope.pageTwoDisplay = 'no';
    $scope.pageThreeDisplay = 'yes';

    $scope.bodyString = "";
    for(var i=0;i<$scope.selectedItems.length;i++)
        {
            $scope.bodyString+=$scope.selectedItems[i].innerHtml;
        }
    var completeHtml = $scope.head + $scope.bodyString + $scope.tail;
var completeObject = {"cHtml":completeHtml}
    
    var parameter = angular.toJson(completeObject);
    $http({
        url: '/vizard/writeHtml',
        method: "POST",
        data: completeObject,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) { 
            // download("index.html",completeHtml);
            // window.location="newproject"
        }, function (response) { });


}


});