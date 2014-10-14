'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','Search','$location',
	function($scope, Authentication, Search,$location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;


		// Autocomplete
    $scope.location = '';
    $scope.options2 = {
      country: 'ng'
    };    
    $scope.details2 = '';


//Date picker
	$scope.today = function() {
  		$scope.dt = new Date();
  		var curr_date = $scope.dt.getDate();
		var curr_month = $scope.dt.getMonth();
		var curr_year = $scope.dt.getFullYear();
		$scope.dt = curr_year + curr_month + curr_date;

  	};
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];


		$scope.showEvent =  false;
		//Search for events
		$scope.search = function(){
			Search.searchEvents({
        location: $scope.location,
        category:$scope.category,
        programDate: $scope.programDate
      });
      $location.path('programs/search');
		};

	}
]);