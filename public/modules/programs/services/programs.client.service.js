'use strict';

angular.module('programs')
    .factory('Programs', ['$resource',
        function($resource) {
            return $resource('programs/:programId', {
                programId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });

        }
    ]);
angular.module('programs').factory('ProgramsComment', ['$resource',
    function($resource) {
        return $resource('programs/:programId/comments/:commentId', {
            programId: '@program',
            commentId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }

        });
    }
]);
angular.module('programs').factory('ProgramsLike', ['$resource',
    function($resource) {
        return $resource('programs/:programId/likes/:likeId', {
            programId: '@program',
            likeId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }

        });
    }
]);

angular.module('core').factory('Search', ['$http', function($http) {   
    var SearchObject = {};

    SearchObject.searchResults = [];

    SearchObject.searchEvents = function(obj) {
    	$http.get('programs/search', {
    		params: obj
    	}).success(function(response) {
    		SearchObject.searchResults = response;
    		console.log(response);
    	});
    };

    SearchObject.getSearchResults = function() {
		console.log(SearchObject.searchResults);
    	return SearchObject.searchResults;
    };

    return SearchObject;
}]);
