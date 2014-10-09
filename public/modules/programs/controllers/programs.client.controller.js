'use strict';

// Programs controller
angular.module('programs').controller('ProgramsController', ['$scope','$http', '$stateParams', '$location', 'Authentication', 'Programs','Comments', 'Likes',
	function($scope,$http, $stateParams, $location, Authentication, Programs, Comments, Likes) {
		$scope.authentication = Authentication;

		// var request = require('request');
		// var url = require('url');
		// app.get('')

		// Create new Program

		$scope.onFileSelect = function($file) {
			
			$scope.select = $file;
			$scope.stringFiles = [];

			for (var i in $scope.select ) {
				console.log(i);
				var reader =  new FileReader();

				reader.onload = function (e) {
					$scope.stringFiles.push({path: e.target.result});
					console.log($scope.stringFiles);
				};

				reader.readAsDataURL($scope.select[i]);	
			}
		};

		$scope.create = function() {
			// Create new Program object
			var program = new Programs ({
				category: this.category,
				name: this.name,
				location: this.location,
				programDate: this.programDate,
				description: this.description
			});
			program.image = $scope.stringFiles;

			// Redirect after save
			program.$save(function(response) {
				console.log(response);
				$location.path('programs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				console.log(errorResponse.data.message);
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
			console.log($scope.programs);
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
			$http.get('/programs/'+ $scope.program._id +'/comments').success(function(res){
				console.log(res);
				$scope.comments=res;
			});
		};
		$scope.addComments = function()
		{
			
			var comment = new Comments({
				comment: this.comment,
			});
			alert('ok');
		};
		// $scope.getComments = function()
		// {
		// 	$scope.comments = Comments.get({
		// 		programId: $stateParams.programId
		// 	});
		// };
	}
]);