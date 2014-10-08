'use strict';

// Programs controller
angular.module('programs').controller('ProgramsController', ['$scope','$http', '$stateParams', '$location', 'Authentication', 'Programs','Comments',
	function($scope,$http, $stateParams, $location, Authentication, Programs, Comments) {
		$scope.authentication = Authentication;

		// Create new Program
		$scope.create = function() {
			// Create new Program object
			var program = new Programs ({
				category: this.category,
				name: this.name,
				location: this.location,
				programDate: this.programDate,
				description: this.description
			});

			// Redirect after save
			program.$save(function(response) {
				$location.path('programs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Program
		$scope.remove = function( program ) {
			if ( program ) { program.$remove();

				for (var i in $scope.programs ) {
					if ($scope.programs [i] === program ) {
						$scope.programs.splice(i, 1);
					}
				}
			} else {
				$scope.program.$remove(function() {
					$location.path('programs');
				});
			}
		};

		// Update existing Program
		$scope.update = function() {
			var program = $scope.program ;

			program.$update(function() {
				$location.path('programs/' + program._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Programs
		$scope.find = function() {
			$scope.programs = Programs.query();
		};

		// Find existing Program
		$scope.findOne = function() {
			$scope.program = Programs.get({ 
				programId: $stateParams.programId
			});
			$scope.getComments();
		};

		$scope.getComments = function()
		{
			//console.log
			$http.get('/programs/'+$scope.program._id+'/comments').success(function(res){
				console.log(res);
				$scope.comments=res;
			});
		};

		// $scope.getComments = function()
		// {
		// 	$scope.comments = Comments.get({
		// 		programId: $stateParams.programId
		// 	});
		// };
	}
]);