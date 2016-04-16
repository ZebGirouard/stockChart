'use strict';

(function() {
    var app = angular.module('nightlifeApp', ['ngTable']);
    
        app.factory("MyYelpAPI", function($http) {
          function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
            return result;
          }
          
          return {
            "retrieveYelp": function(location, callback) {
                var method = 'GET';
                var url = 'https://api.yelp.com/v2/search';
                var params = {
                        callback: 'angular.callbacks._0',
                        location: location,
                        oauth_consumer_key: 'LgRfnUX5fUNhNL5a90m3Hg', //Consumer Key
                        oauth_token: 'hSFDXjWZ--Zfoe1un9ryi2eFS1ZhZTgw', //Token
                        oauth_signature_method: "HMAC-SHA1",
                        oauth_timestamp: new Date().getTime(),
                        oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                        category_filter: 'bars'
                    };
                var consumerSecret = '1FTuNUPFo_qMHhhwAouFBEorQJ4'; //Consumer Secret
                var tokenSecret = 'CfbzR1348MtE7cLWLsl2Zly9Gdk'; //Token Secret
                var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
                params['oauth_signature'] = signature;
                $http.jsonp(url, {params: params}).success(callback);
            }
          };
        });
        
        app.controller('activityController', ['$scope', '$http', 'MyYelpAPI', function ($scope, $http, MyYelpAPI) {

            //Handle GitHub Auth
            $scope.loggedIn = false;
            var displayName = document.querySelector('#display-name');
            var userUrl = '/api/user/:id';
            var venueUrl = '/api/venue/';
            var attendeeUrl = '/api/attendee/';
          /*
             function updateHtmlElement (data, element, userProperty) {
                element.innerHTML = data[userProperty];
             }
            */ 
             // GET GitHub User Info
            $http({
               method: 'GET',
               url: userUrl
            }).then(function successCallback(response) {
                 $scope.currentUser = {
                     displayName: response.data['displayName'],
                     id: response.data['id'],
                     username: response.data['username'],
                 };
                 displayName.innerHTML = $scope.currentUser['displayName'];
                 $scope.loggedIn = true;
               }, function errorCallback(response) {
                 console.log(response);
            });
               
            //Get Venues from Yelp
            if (sessionStorage.venues) {
                $scope.venues = JSON.parse(sessionStorage.venues);
            }
            else {
                $scope.venues = [];
            }
                
            $scope.getActivities = function(location) {
                MyYelpAPI.retrieveYelp(location, function(data) {
                    $scope.venues = data.businesses;
                    //Get Attendee Info
                    var j = 0;
                    for (let i=0; i<$scope.venues.length; i++) {
                        var venueID = $scope.venues[i].id;
                        $http({
                           method: 'GET',
                           url: venueUrl+venueID
                        }).then(function successCallback(response) {
                            var attendeeTotal;
                            if (response.data) {
                                attendeeTotal = response.data.attendees.length;                                
                            }
                            else {
                                attendeeTotal = 0;
                            }
                             $scope.venues[i].attendees = attendeeTotal;
                            j++;
                            if (j === $scope.venues.length) {
                                sessionStorage.setItem('venues', JSON.stringify($scope.venues));
                            }
                           }, function errorCallback(response) {
                             console.log(response);
                        });   
                    }
                });
            };
            
            $scope.toggleAttendee = function(venueID) {
                var userID = $scope.currentUser.id;
                $http({
                   method: 'POST',
                   url: attendeeUrl+venueID+"/"+userID
                }).then(function successCallback(response) {
    			    var alteredVenues = $scope.venues.map(function(element) {
    				    if (element.id == venueID) {
    				        element.attendees = response.data.attendees.length;
    				        return element;
    				    }
    				    else {
    				        return element;    				    
    				    }
    			    });                      
    				$scope.venues = alteredVenues;
    				sessionStorage.setItem('venues', JSON.stringify($scope.venues));
                   }, function errorCallback(response) {
                     console.log(response);
                });
            };
        }]);
})();