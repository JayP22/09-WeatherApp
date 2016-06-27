(function() {
    'use strict';

    angular
        .module('weatherApp')
        .controller('MainController', MainController);

    MainController.$inject = ['mainFactory','toastr']; // inject Factory and toastr

    /* @ngInject */
    function MainController(mainFactory,toastr) {
        var vm = this;
        vm.title = 'MainController';
        vm.checkWeather = checkWeather;

        activate();

        ////////////////

        function activate() {
        	checkWeather ('London');
        }

        vm.searches = [];		// search records array
        function addrecord(name, time) {		// add new data to the array
            vm.searches.unshift({ 'name': name,'time': time,});
        }

        function checkWeather(city) {
        	mainFactory.tempWehther(city).then(function(result) {
        		if( !isNaN(vm.citysearch) ){	// text input validation
	        		toastr.error("Please insert the city name")}
	        		else{
	                vm.names = result.data;
	                toastr.success("it is working"); // toastr 
	                vm.citysearch = city;	// search box value
	                vm.date = new Date();	// get the current date
	                vm.time = vm.date.getHours() + ":" + vm.date.getMinutes() + ":" + vm.date.getSeconds();		// current time
	                vm.day = vm.date.getMonth() +"/"+ vm.date.getDay() +"/"+ vm.date.getFullYear(); 	// current date
	                vm.fulltime = "  " + vm.day + " "+vm.time;
	                addrecord( vm.names.name, vm.fulltime); // 	add new data to the search array
	                if( vm.searches.length > 4 ) { vm.searches.pop(); }		// delete record		
	            }    
        	}),
        function(error){
        toastr.error(error.data);
        };
    	} 
    }
})();