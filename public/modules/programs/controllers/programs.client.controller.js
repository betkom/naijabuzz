'use strict';

// Programs controller
angular.module('programs').controller('ProgramsController', ['$scope','$http', '$stateParams', '$location', 'Authentication', 'Programs','CustomRequest',
	function($scope,$http, $stateParams, $location, Authentication, Programs,CustomRequest) {
		$scope.authentication = Authentication;
		// Create new Program
		$scope.programDate.datepicker();
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
				console.log(response._id);
				$location.path('programs/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.location = '';
				$scope.description = '';
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
			$scope.programs =Programs.query();
			console.log($scope.programs);
		};

		//Find existing Program
		$scope.findOne = function() {
			$scope.program = Programs.get({ 
				programId: $stateParams.programId
			});

			CustomRequest('GET','programs/'+ $stateParams.programId+'/comments',{},function(d){
				$scope.comments = d;
			},true);
			//$scope.getComments();
		};

		// $scope.getComments = function()
		// {
		// 	//console.log
		// 	$http.get('/programs/'+ $scope.program._id +'/comments').success(function(res){
		// 		console.log(res);
		// 		$scope.comments=res;
		// 	});
		// };
		$scope.addComments = function(program,comments)
		{
			CustomRequest('POST','programs/'+ $stateParams.programId+'/comments',{comment:$scope.comment},function(){$location.path('programs/'+ $stateParams.programId);},true);
			$scope.findOne();
			$scope.comment = '';
		};
		$scope.doLike = function(program,likes) {
			$scope.showLike = true;
			$scope.showLike= false;
  			CustomRequest('PUT','programs/'+ $stateParams.programId +'/likes',{like:$scope.like}, function(res){

  				$scope.likes.push(res);
  				$location.path('programs/'+ $stateParams.programId);
  				
  		},true);
  			//$scope.findOne();
  			

};		$scope.unLike = function(like){
		 $scope.showLike=true;
CustomRequest('DELETE','programs/'+ $stateParams.programId +'/likes/'+like._id,{}, function(res){

				var index = $scope.likes.index(like);
  				$scope.likes.splice(index,1);
  				//$location.path('programs/'+ $stateParams.programId);

  		},true);

	};
}
]);




// app.factory('Progs',['$http', function($http){
// 	var o = {
//     progs: []
//   };
//   o.like = function(program) {
//   	console.log(program._id);
//   return $http.put('/programs/' + program._id + '/likes')
//     .success(function(data){
//       program.likes += 1;
//     });
// };
// 	o.addComment = function(id, comment) {
// 	  return $http.post('/posts/' + id + '/comments', comment);
// 	};
//   return o;
// }]);