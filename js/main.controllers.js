/**
	 * mainCtrl controller.
	 *
	 *  Main Controller for RiskMonitor 
	 */
(function () {
    'use strict';
   angular.module('riskMonitor')
   .controller('mainCtrl', ['$scope','$filter','exposureApiService',function ($scope, $filter, exposureApiService){
        var vm = this;
		
		//Declare default values		
		vm.date_range = [{
			  sDate:new Date(2014,11,1,0,0,0),
			  eDate:new Date(2015,1,28,0,0,0)
			},
			{
			  sDate:new Date(2015,1,1,0,0,0),
			  eDate:new Date(2015,3,30,0,0,0)
			},
			{
			  sDate:new Date(2015,7,1,0,0,0),
			  eDate:new Date(2015,9,30,0,0,0)
			},
			{
			  sDate:new Date(2016,0,1,0,0,0),
			  eDate:new Date(2016,2,31,0,0)
			}
		];

		//Highlight Box Data
		vm.highlightsData=[
		{
			'name':'Total Margin',
			'gain':true,
			'inper':12.5,
			'value':1231462.57
		},
		{
			'name':'Total Risk',
			'gain':false,
			'inper':25.6,
			'value':1456432.34
		},
		{
			'name':'Total Exposure',
			'gain':true,
			'inper':14.67,
			'value':1231462.57
		},
		{
			'name':'Total Profit Value',
			'gain':true,
			'inper':8.45,
			'value':2783938.67
		}];

		//Stastics Data
		vm.statData = [{
			'type':'R',
			'typeValue':40,
			'val':17,
			'accts':21
		},
		{
			'type':'M',
			'typeValue':40,
			'val':8,
			'accts':17
		},
		{
			'type':'E',
			'typeValue':40,
			'val':23,
			'accts':27
		},
		{
			'type':'PV',
			'typeValue':40,
			'val':2,
			'accts':4
		}];

		vm.chartData = '';		        	

		//Fetch Data from csv file and rendering it
        exposureApiService.fetchData().success(function (edata) {            
			var rows;
			rows = edata.split("\n");
			var chartData1=[], chartData2=[],dateArr, formatedDate, indicatorDate, obj;	
			vm.chartValues =[];
            for (var i = 1; i < rows.length; i++) {  
				if(rows[i]){
					chartData1 = rows[i].split(',"');					
					chartData2 = chartData1[1].split('",');
					dateArr = chartData1[0].split('/');
					indicatorDate = new Date(dateArr[2],dateArr[1],dateArr[0],0,0,0);
					formatedDate=$filter('date')(indicatorDate,'dd MM yyyy');
					obj={
						'formatedDates':formatedDate,
						'date':indicatorDate,
						'exposure':parseFloat(chartData2[0].replace(/\,/g,'')),
						'exposure_mom':parseFloat(chartData2[1].replace(/[^0-9.-]/g, "")),
					}
					vm.chartValues.push(obj);
				}								
            }
            $scope.date_range_selected = vm.date_range[0];//By Defult select first range
        
        }).error(function(){
            //Because application is not on server. Service request will work in Firefox only. 
            alert('Cross origin requests are not supported. Please use Firefox Browser.'); 
        });
        
        $scope.$watch('date_range_selected',function(newVal,oldVal){
        	if(newVal)
        		updateData(newVal);
        });

        /** updateData Function
          * @param newVal : new date range 
          * Use to filter & modified data based on data & date range
		*/ 
        function updateData(newVal){
        	
        	var filterArr;
        	if(vm.chartValues){
        		 vm.chartData= {
					'formatedDates':[],
					'exposure':[],
					'exposure_mom':[]
				};	
	        	vm.chartValues.filter(function (el){
	        		var date = new Date(el.date);
	        		var sDate =new Date($scope.date_range_selected.sDate);
	        		var eDate =new Date($scope.date_range_selected.eDate);
	        		
					if(sDate.getTime()<date.getTime() && date.getTime()<=eDate.getTime()){
						vm.chartData.formatedDates.push(el.formatedDates);
						vm.chartData.exposure.push(el.exposure);
						vm.chartData.exposure_mom.push(el.exposure_mom);
					}
				});
				
        	}
        }		

	}]);
})();

