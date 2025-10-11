# Creating spider web using Highcharts
## Introduction
In this snippet you will create a custom spider web using a custom page and populating data using Highcharts native library

## Step 1: Create a new Widget
***Go to Service Portal > Widget > Click New***
- Name: Custom productionProcess
- Id: custom-gojs-productionProcess
- Click on `submit`

***Body HTML template***
- Copy and paste below `HTML Code` in Widget's HTML Template section
```HTML
<div>  
	<!-- chart -->
    <div id="container"></div>
    <p class="highcharts-description">
        A spiderweb chart or radar chart is a variant of the polar chart.
        Spiderweb charts are commonly used to compare multivariate data sets,
        like this demo using six variables of comparison.
    </p>
</div>
```

***CSS/SCSS***
- Copy and paste below `CSS` in Widget's CSS/SCSS Section
```CSS
/* to be completed */
```
***Client Side Scripts***
- Copy and Paste below `Script` in Widget's Client Side Section
```javascript
api.controller=function($rootScope, $scope, $window, $interval, spUtil) {
  /* widget controller */
	var c = this;

	/** Chart source: https://www.highcharts.com/demo/polar-spider*/
	var options = {
        credits: {
            enabled: false
        },

        chart: {
            renderTo: 'container', // change chart_id if needed
            polar: true,
            type: 'line'
        },

    accessibility: {
        description: 'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
    },

    title: {
        text: 'Budget vs spending',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
            'Information Technology', 'Administration'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
    },

    series: [{
        name: 'Allocated Budget',
        data: [43000, 19000, 60000, 35000, 17000, 10000],
        pointPlacement: 'on'
    }, {
        name: 'Actual Spending',
        data: [50000, 39000, 42000, 31000, 26000, 14000],
        pointPlacement: 'on'
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                pane: {
                    size: '70%'
                }
            }
        }]
    }
};
	
  /*Generate chart*/
	var chart = new Highcharts.Chart(options);
  
  /* improvements: next step would be to have a ng-selector in HTML and use record watcher to keep data up do date */
	
};
```

## Step 2: Add native Highcharts library to your widget as widget dependencies
***Go to Service Portal > Widget ***
- Search for your previous widget created "Custom Spider Web" (custom-spider-web) and open the record. 
- On the related tab Dependencies, click on `Edit` button.
- Search for PA Widget (4fbe3df5673322002c658aaad485ef29) and add to your list.
- Click on `Save` button to save the change. 

## Step 3: Create a new Page
***Go to Service Portal > Page > Click New***
- Name: spiderweb - Test Page
- ID: spiderweb
- Click on `Submit` button.
- Once submitted, Click on `Open in Page Designer` related link
- In Page designer, Place `custom-spider-web` widget inside a container > row > Column at top location.
- View paget from following link `http://instance-name.service-now.com/sp?id=spiderweb`. 

## Sources
***Any of following links are not under my surveilance or maintenance***

https://github.com/NorthwoodsSoftware/GoJS/blob/master/samples/productionProcess.html
https://gojs.net/latest/intro/toolTips.html
http://g-mops.net/epica_gojs/api/symbols/Diagram.html