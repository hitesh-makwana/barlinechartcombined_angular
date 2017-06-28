/**
     * chart Directive.
     *
     *  Display line-bar combined chart based on data
        Example of Use:<statistics data="data"></statistics>
     */
(function () {
 'use strict';
  angular.module('riskMonitor')
 .directive('chart', ['$window',function ($window) {
            return {
                restrict: 'A',
                template: '<canvas id="barlineChart" width="100%"></canvas>',//inline templates to prevent cross origin error when running locally on chrome
                controller: 'chartCtrl as $ctrl',
                scope: { chartData: '='}				
            };
    }])
 /**
     * chart Controller.
     *
     */
 .controller('chartCtrl', ['$scope','$window', function ($scope,$window) {
 		var vm = this;

        //watch for chartdata
        $scope.$watch('chartData',function(newVal,oldVal){            
            vm.chartData =newVal;            
            if(vm.chartData){
                if($window.myBar){
                    $window.myBar.destroy();//Destroy created chart to update chart date
                } 
                createChart();
            }   
        });

        //Default values
        vm.monthLngNames= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];   
        vm.monthShrtNames= ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];   
 		
        /** createChart Function
          * Use to create chart based on data
        */ 
        function createChart(){
            vm.barChartData = {
            labels: vm.chartData.formatedDates,
            datasets: [ {
                label: "EXPOSURE TREND",
                    type:'line',
                    data: vm.chartData.exposure_mom,
                    fill: false,
                    radius:0,
                    borderColor: '#EC932F',
                    backgroundColor: '#EC932F',
                    pointBorderColor: '#EC932F',
                    pointBackgroundColor: '#EC932F',
                    pointHoverBackgroundColor: '#EC932F',
                    pointHoverBorderColor: '#EC932F',
                    borderWidth:0.8,
                    yAxisID: 'y-axis-1'                   

            },{
                type: 'bar',
                  label: "EXPOSURE",
                    data: vm.chartData.exposure,
                    fill: true,
                    backgroundColor: '#CCCCCC',
                    borderColor: '#CCCCCC',
                    hoverBackgroundColor: '#707070',
                    hoverBorderColor: '#707070',
                    yAxisID: 'y-axis-2',

            }]
        };
        var ctx = document.getElementById("barlineChart").getContext("2d");            
        var chartOptions={
                type: 'bar',
                data: vm.barChartData,
                options: {
                responsive: true,
                legend:false,
                hover: {
                    onHover: function(e, el) {
                      document.getElementById("barlineChart").style.cursor=(el[0])? "pointer" : "default";
                   }
                },
                tooltips: {
                    mode: 'label',
                    displayColors:false,
                    xLabel:'EXPOSURE',
                    yLabel:'EXPOSURE TREND',
                    titleAlign:'center',
                    bodyAlign:'center',
                    enabled:true,
                    xPadding:3,
                    yPadding:3,
                    titleSpacing:0,
                    titleFontColor:'#CCCCCC',
                    titleFontSize:11,
                    titleMarginBottom:2,
                    backgroundColor:'#FFFFFF',
                    bodyFontFamily:'"Expert-Sans-Regular","Helvetica",Helvetica,Arial,sans-serif',
                    bodyFontColor:'#555555',
                    bodyFontColor2:'#ff6600',
                    bodyFontSize:16,
                    bodyFontFamily2:'"Expert-Sans-Bold","Helvetica",Helvetica,Arial,sans-serif',
                    bodyFontStyle:'bold',
                    bodyFontStyle2:'normal',
                    bodySpacing:0,
                    bodyFontSize2:10,
                    borderWidth:0.5,
                    borderColor:'#CCCCCC',                    
                    caretPadding:5,
                    caretSize:10,
                    cornerRadius:0,
                    paddingAdjustment:60,
                    toolTipRiskMonitorTemplate:true,
                    callbacks: {
                            title: function(tooltipItems, data) {
                                var tooltipItem = tooltipItems[0];
                                var month = tooltipItem.xLabel.substr(3,2);
                                var monthNew = vm.monthShrtNames[month-1];
                                var title=tooltipItem.xLabel.substr(0,2)+' '+monthNew.toUpperCase()+' '+tooltipItem.xLabel.substr(6,4);
                                return title;
                            }
                    }
                },
              elements: {
                line: {
                    fill: true,
                    usePointStyle:false
                },
           },
           scales: {
                xAxes: [{
                  categoryPercentage: 1,
                    barPercentage: 1,
                    display: true,
                    groupByLabel:true,
                    monthLabels:vm.monthLngNames,
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true,
                    },
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0,
                        minRotation: 0,
                        beginAtZero:false,
                    }
                }],
                yAxes: [{
                    type: "linear",
                    display: false,
                    position: "left",
                    id: "y-axis-1",
                    gridLines:{
                        display: true,
                        borderDash: [8, 4]
                    },
                    labels: {
                        show:false,                        
                    }
                }, 
                {
                    type: "linear",
                    display: true,
                    position: "right",
                    id: "y-axis-2",
                    gridLines:{
                        display: true,
                        color:'#CCC',
                        borderDash: [3, 3]
                    },
                    labels: {
                        show:true,
                        
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 5,

                        callback: function(label, index, labels) {
                            return (label)?label/1000000+'M  ':'';
                        }
                    }
                }]
            }
            }};

            $window.myBar = new Chart(ctx,chartOptions);

        }

            
 	}]);
})();
