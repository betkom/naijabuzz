'use strict';

// Programs controller
angular.module('programs').controller('ProgramsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Programs', 'Comments', 'ProgramsComment', 'Likes', 'ProgramsLike', 'Search',
    function($scope, $http, $stateParams, $location, Authentication, Programs, Comments, ProgramsComment, Likes, ProgramsLike, Search) {
        $scope.authentication = Authentication;
        var geocoder;

        // SearchResults for Programs
        $scope.searchResults = Search.searchResults;
        if ($scope.searchResults.length < 1) {
            $scope.noResult = true;
        } else {
            $scope.noResult = false;
        }
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
        $scope.clear = function() {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
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
        $scope.stringFiles = [];

        //Image Upload
        $scope.onFileSelect = function($file) {
            $scope.select = $file;
            if ($scope.select[0].type === 'image/gif' || $scope.select[0].type === 'image/png' || $scope.select[0].type === 'image/jpg' || $scope.select[0].type === 'image/jpeg') {

                var reader = new FileReader();
                reader.onload = function(e) {
                    $scope.stringFiles.push({
                        path: e.target.result
                    });
                };
                reader.readAsDataURL($scope.select[0]);
            }
        };

        // Create new Program object
        $scope.create = function() {
            var program = new Programs({
                category: this.category,
                name: this.name,
                location: this.location,
                programDate: this.programDate,
                description: this.description
            });
            program.image = $scope.stringFiles;

            // Redirect after save
            program.$save(function(response) {
                $location.path('programs/' + response._id);

                // Clear form fields
                $scope.name = '';
                $scope.location = '';
                $scope.description = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        // Remove existing Program
        $scope.remove = function(program) {
            if (program) {
                program.$remove();

                for (var i in $scope.programs) {
                    if ($scope.programs[i] === program) {
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
            var program = $scope.program;
            program.$update(function() {
                $location.path('programs/' + program._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Programs
        $scope.find = function() {
            $scope.programs = Programs.query().sort();
        };

        function fixDate(i) {
                i = i.toString();
                return i.length === 1 ? '0' + i : i;
            }
            //Find existing Program
        $scope.findOne = function() {
            $scope.programContent = Programs.get({
                programId: $stateParams.programId
            }, function(response) {
                $scope.qrcodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=';
                // Setting Map Position
                try{
                    geocoder = new google.maps.Geocoder();
                    var options = {
                        zoom: 17
                    };
                    var map = new google.maps.Map(document.getElementById('map_canvas'), options);
                    var sAddress = $scope.programContent.program.location;
                    geocoder.geocode({
                        'address': sAddress
                    }, function(results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            $scope.marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location,
                                animation: google.maps.Animation.BOUNCE
                            });
                            map.setCenter(results[0].geometry.location);
                        }
                    });
                }
                catch(e0)
                {
                    
                }
                $scope.program = $scope.programContent.program;
                //Formating Date
                var cdate = new Date($scope.program.programDate);
                cdate = cdate.getFullYear() + '-' + fixDate(cdate.getMonth() + 1) + '-' + fixDate(cdate.getDate());
                //Setting QR Code
                var qrData = encodeURIComponent('Title: ' + $scope.program.name + '\nDescription: ' + $scope.program.description + '\nDate: ' + cdate + '\nLocation: ' + $scope.program.location);
                $scope.qrcodeUrl = $scope.qrcodeUrl + qrData;
                delete $scope.programContent.program;
                delete $scope.programContent.userlike;

                for (var i in $scope.programContent) {
                    $scope.program[i] = $scope.programContent[i];
                }
                //Check if user has liked Event before
                $scope.hasLiked = $scope.programContent.userlike ? true : false;
            });
            //Get Program Comments
            $scope.comments = ProgramsComment.query({
                programId: $stateParams.programId
            });
        };

        $scope.addComments = function() {
            // Create new Comment object
            var comment = new ProgramsComment({
                comment: $scope.newComment
            });
            //Redirect after save
            comment.$save({
                programId: $stateParams.programId
            }, function(response) {
                $scope.findOne();
                $scope.newComment = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.doLike = function() {
            // Create new Like object
            var likeObject = {
                like: true
            };
            var like = new ProgramsLike(likeObject);
            //Redirect after save
            like.$save({
                programId: $stateParams.programId
            }, function(response) {
                $scope.hasLiked = response;
                if (response) {
                    if (response.like) {
                        $scope.program.likes.push(response._id);
                    } else {
                        var i = $scope.program.likes.indexOf(response._id);
                        if (i > -1) {
                            $scope.program.likes.splice(i, 1);
                            $scope.hasLiked = false;
                        }
                    }
                }
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);
