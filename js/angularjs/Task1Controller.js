'use strict';
		
app.controller('Task1Ctrl', function($scope, $http, WeatherData) {

	findMyLocation();
	$scope.weatherDataFromApi = [];
	$scope.showButton = "false";
	 //obtain coordinates to create instance of weatherData 
	 $scope.getCoordinates = function (lat,lon) 
	 {
	 	 var WeatherProfile = new WeatherData(lat,lon,null );
	     WeatherProfile.getWeatherData();
	 }
	

     //updates UI with waeather map data from API call
     $scope.updateUI = function(data)
	 {  
	    $scope.showButton = "true";
		cleanUpDialog();
		if(data!==null)
		{
	    	$scope.weatherDataFromApi.push(data)	
		}
		    	
	  }	  
	  //obtains new weather info from api 
	   $scope.newWeatherData= function()
	  {
		   
		 cleanUpDialog();
		 showDialog();
	  }
	
	//obtains weather data when the user denies to share the location
	$scope.getWeather = function () 
	{	
	    processDialog();	
		if($("#pcode").val() == undefined || $("#pcode").val()=='')
	   {
		  alert("Country code another be empty");
			return;
	   }
	   else
	   {
		   var WeatherProfile = new WeatherData(null,null,$scope.pcode );
           WeatherProfile.getWeatherData();
		   hideDialog();
	   }
		//var WeatherProfile = new WeatherData(null,null,$scope.pcode,$scope.country );
        //WeatherProfile.getWeatherData();
		//hideDialog();
    }
});

