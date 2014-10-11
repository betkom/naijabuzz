'use strict';

//Programs service used to communicate Programs REST endpoints
angular.module('programs').factory('Progs', ['$resource',
	function($resource)
	 {
		return {
			Programs: $resource('programs/:programId', { 
				programId: '@_id'
			},
		 	{
			update: {
				method: 'PUT'
			}
		}),
		Comments: $resource('/programs/:programId/comments',{
		programId: '@program'
		},
		{
		update:{
			method: 'PUT'
		}
	}),
	};
}
]);

angular.module('programs').factory('Programs', ['$resource',
	function($resource)
	 {
		return $resource('programs/:programId', { 
				programId: '@_id'
			},
		 	{
			update: {
				method: 'PUT'
			}
		});
	
	}
]);

angular.module('programs').factory('CustomRequest',['$http',function($http){

	return function(method,path,params,callback,isDEV)
	{	
		//CHECK VALID arguments
		method = method&&typeof method === typeof 'a'?method:'GET';
		path = path&&typeof path === typeof 'a'?path:'/programs/';
		params = params&&typeof params === typeof {}?params:{};

		$http({method:method,url:path,data:params}).success(function(d,s,h,c){
			
			if(isDEV){
				console.log(arguments);
			}
			if(callback && typeof callback === typeof function(){}){
				callback(d,s,h,c);
			}
			else{
				console.log('not a function');
			}
		}).error(function(d,s,h,c){
			
			if(isDEV){
				console.log(arguments);
			}
			if(callback && typeof callback === typeof function(){}){
				callback(d,s,h,c);
			}
			else{
				console.log('not a function');
			}
		});
		return true;
	};

}]);


 angular.module('core').factory('Search', ['$resource',
  function($resource) {
    return $resource('/programs/search');
  }
]);