(function() {
    'use strict';

    angular
        .module('weatherApp')
        .factory('mainFactory', mainFactory);

    mainFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function mainFactory($http, $q) {
        var service = {
            tempWehther: tempWehther
        };
        return service;

        ////////////////

        function tempWehther(city) {
        	var defer = $q.defer();
          //  var city = city;

            $http({
                method: 'GET',
                url: 'http://api.openweathermap.org/data/2.5/weather',
                params: {
                    appid: 'b23dff359db573a1573a95cb9dc2dba9',
                    q: city
                }
                
            })
                  

                .then(function(response) {
                    if(typeof response.data === 'object'){
                    defer.resolve(response);    
                    } else {
                    defer.reject("No Data Found!");
                    }
                },
                function(error){
                    defer.reject(error);
                }
                ); return defer.promise; 
        }
    }
})();