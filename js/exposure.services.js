/**
	 * exposureApiService Service.
	 *
	 *  Use to retrive exposure date from file
	 */
(function () {
	'use strict';
	 angular.module('riskMonitor')
	.service('exposureApiService', exposureApiService);
	
	/** exposureApiService Function
          * @param $http : $http service
       */
	function exposureApiService($http) {
		//Get Chart Data
		function fetchData() {
			return $http.get('data/chart_data.csv');
		}
		return {
			fetchData: fetchData
		}
	}
})();