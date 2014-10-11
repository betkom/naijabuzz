'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','Search',
	function($scope, Authentication, Search) {
		// This provides Authentication context.
		$scope.authentication = Authentication;


		$scope.search = function(){
			// var $or = {$or:[]};
			// var checkQuery = function(){
			// 	if ($scope.location && $scope.location.length >0){
			// 		$or.$or.push({location : new RegExp($scope.location, 'i')});
			// 	}
			// 	if ($scope.category && $scope.category.length > 1){
			// 		$or.$or.push({category: new RegExp($scope.category)});
			// 	}
			// 	if($scope.programDate && $scope.programDate.length>1)
			// 	{
			// 		$or.$or.push({programDate:new RegExp($scope.programDate)});
			// 	}
			// };
			// checkQuery();
			Search.query({location : new RegExp($scope.location, 'i')},
				{category: new RegExp($scope.category)},
				{programDate:new RegExp($scope.programDate)},
		        function(reply){
		          $scope.programs=reply;
				console.log(reply);
		        },
		        function error(){
		          console.log(error);
		        }
			);

		};
	}
]);