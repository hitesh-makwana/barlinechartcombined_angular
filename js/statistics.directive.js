/**
	 * statistics Directive.
	 *
	 *  Use to display statistics of riskmonitor
	 <highlights data="data"></highlights>	
	 */
(function () {
 'use strict';
  angular.module('riskMonitor')
 .directive('statistics', [function () {
            return {
                restrict: 'EA',
                template: '<div class="statistics-container" ng-class="{\'active\':active}"><div class="btn-container"><button ng-mouseover="active = true" ng-mouseleave="active = false"><span>Details</span><i class="material-icons md-12">search</i></button><button  ng-mouseover="active = true" ng-mouseleave="active = false"><span>Edit</span><i class="material-icons md-12">mode_edit</i></button><button  ng-mouseover="active = true" ng-mouseleave="active = false"><span>Delete</span><i class="material-icons md-12">clear</i></button></div><div class="statbox" ><p class="smallbox"></p><div class="bigbox"><i class="material-icons">arrow_drop_up</i>{{data.type}}>{{data.typeValue}}%</div><div> <p class="field text-left">%VAL<span  class="value">{{data.val}}%</span></p><p  class="field text-right accts">ACCTS<span  class="value">{{data.accts}}%</span></p> </div></div></div>',//inline templates to prevent cross origin error when running locally on chrome
                scope: {
					data: '='
				}
            };
    }]);
})();
