'use strict';

var app = angular.module("workforus", ['angularUtils.directives.dirPagination']).

 config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
        when('/', { templateUrl: 'pages/mainContent.html', controller: 'MainCtrl' })
       .when('/task1', {
                templateUrl : 'pages/task1.html',
                controller  : 'Task1Ctrl'   
            })
	   .when('/task2', {
                templateUrl : 'pages/task2.html',
                controller  : 'Task2Ctrl' 
            })
	    .when('/task3', {
                templateUrl : 'pages/task3.html',
                controller  : 'Task3Ctrl'
            }).
                otherwise({
                    redirectTo: '/'
                });

 }]);
 app.config(['$locationProvider', function($location) {
    $location.hashPrefix('!');
}]);


var Coordinates = function(latitude, longitude)
{
	   	this.latitude = latitude;
		this.longitude = longitude;
}

app.factory('WeatherData', function($http,$timeout) {

    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=b1151d8d165aff56a1b27815ff1a6cfe';

var WeatherData = function(latitude, longitude,pcode) 
	{
			this.latitude = latitude;
			this.longitude = longitude;
			this.pcode = pcode;
			
		WeatherData.prototype.getWeatherData = function() 
		{
			var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=b1151d8d165aff56a1b27815ff1a6cfe';
			
		   if(this.latitude !==null && this.longitude !==null)
		   {
			   
			   $http.get(apiUrl+ '&lat=' + this.latitude +'&lon='+this.longitude)
				.success(function (data) {
					$timeout(function() {
                       var scope = angular.element(document.getElementById("Task1Wrap")).scope();
			            scope.updateUI(data);
				 });
					 
					return data;
                 })
            	.error(function (data) {
                	alert("Error");
					//showDialog();
            	});
			
		   }//end if
		   else
		   {
			    $http.get(apiUrl + '&zip=' + this.pcode)
				.success(function (data) {
					
					$timeout(function() {
                       var scope = angular.element(document.getElementById("Task1Wrap")).scope();
			          scope.updateUI(data);
				 });
					 
					return data;
                 })
            	.error(function (data) {
                	alert("Error: Try again");
					cleanUpDialog();
					showDialog();
            	});
				
			  		   }
		};
	
	
	};

    return WeatherData;
})

//function is used to obtain coordinates
function findMyLocation() 
{
	  if (!navigator.geolocation)
	  {
		console.log("nothing captured");
		cleanUpDialog();
		showDialog();
		return null;
	  }
	
	  function success(position) 
	  {	     
		   var coord = new Coordinates(position.coords.latitude,position.coords.longitude);
		   
		   var scope = angular.element(document.getElementById("Task1Wrap")).scope();
			  scope.$apply(function () {
			  scope.getCoordinates(position.coords.latitude,position.coords.longitude);
			  });
	
		  }
	
	  function handleError(error)
	  {
			switch (error.code)
			{
				case error.PERMISSION_DENIED:
				alert('Permission denied');
					cleanUpDialog();
					showDialog();
					break;
				case error.POSITION_UNAVAILABLE:
					alert('Position is currently unavailable.');//to go home page
					break;
				case error.PERMISSION_DENIED_TIMEOUT:
					alert('User took to long to grant/deny permission.'); //to go home page
					window.location.href = '/workforus/index.html';
					break;
				case error.UNKNOWN_ERROR:
					alert('An unknown error occurred.') //to go home page
					window.location.href = '/workforus/index.html';
					break;
			}

	  };
			  var Options = { 
				  timeout: 10 * 1000
			};
      var a =   navigator.geolocation.getCurrentPosition(success, handleError, Options);
	    
}

