===================================
|                                 |
|   Risk Monitor Application      |
|                                 |
===================================

Assumption:
To complete task, some assumtions has been taken
1. Assuming that layout is responsive - fluid layout
2. Assuming all the data except chart is hardcoded.
3. Assuming chart date range are 3 months. for more months needs to update logic with shorter labels on X-axis.
4. Assuming data will come from sperate file .csv file
5. Assuming chart should be drawn with any chart library, chart dependancy are charts v2.6.0.js
6. Material Icons CDN has been used assuming application will be viewed with an active internet connection.


Folder Structure:

|-CSS
  |--style.css
  |--fonts
  |--vendor
     |--bootstrap.min.css 
|-data
  |--chart_data.csv  
|-img
  |--favicon.png
|-js
  |--app.js
  |--chart.directive.js
  |--exposure.service.js
  |--formatedate.filter.js
  |--highlights.directive.js
  |--main.controller.js
  |--statistics.directive.js
  |-brower_components
    |--angular.js
    |--chart.js
|-index.html

How To Run:
1. Open file index.html in Firfox Browser

Note: To view on IE or Chrome browser you need to upload it on server.

Functionalities:
1. Responsive Layout
2. line-bar chart generated based on selected date-range
3. Updated ChartJs library to build customize chart according to requirments
3. highlights, stastics render based on json data
4. filter created to generate date-label for date-range

Known Issue:
1. Action Labels on left column stastics box are supported only in tablet view. Due to lables are longer, for desktop view and mobile view it has been removed and displayed only icons.

2. For mobile view, Month, Year labels needs to be shorter and should be recreated based on screen size. Due to time limit, it is considered as known issue can be resolve in future.

  
  
  