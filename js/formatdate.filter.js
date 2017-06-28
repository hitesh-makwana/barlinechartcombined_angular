/**
	 * formatdate filter.
	 *
	 *  filter date object to date range label
     
	 */
(function () {
 'use strict';
  angular.module('riskMonitor')
 .filter('formatdate', ['$filter', function ($filter) {
             return function(obj) {
             	var sDate=$filter('date')(obj.sDate,'dd MMM yyyy');
             	var eDate=$filter('date')(obj.eDate,'dd MMM yyyy');
             	return  sDate +'-'+eDate;
			}; 
            
    }]);
})();
