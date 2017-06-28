/**
	 * highlights Directive.
	 *
	 *  Use to display highlights of riskmonitor
	 <highlights data="data"></highlights>	
	 */
(function () {
 'use strict';
  angular.module('riskMonitor')
 .directive('highlights', [function () {
            return {
                restrict: 'E',
                template: '<div class="highlight-container {{class}}"><div><span class="pull-left heading">{{data.name}}</span><span class="pull-right indcnt">{{data.gain?"+":"-"}}{{data.inper}}</span></div><div class="count">{{data.value|number}}<i class="material-icons md-18">{{data.gain?"arrow_drop_up":"arrow_drop_down"}}</i></div></div>',//inline templates to prevent cross origin error when running locally on chrome
                scope: {
					data: '='
				},
				link:function(scope,attr,ele){
					switch(scope.data.name){
						case 'Total Risk':
							scope.class='risk';
						break;
						case 'Total Profit Value':
							scope.class='lightgray';
						break;	
						
					}
				}
            };
    }]);
})();
