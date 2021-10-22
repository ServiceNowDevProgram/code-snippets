# Creating Process flow in service portal
## Introduction
In this snippet you will create a custom process flow with a custom page and populated with standard widgets.

## Step 1: Create a new Widget
***Go to Service Portal > Widget > Click New***
- Name: Process Flow
- Id: process-flow
- Click on `submit`

***Body HTML template***
- Copy and paste below `HTML Code` in Widget's HTML Template section
```HTML
<div class="container">
  <div class="process">
    <div class="process-row">
      <div class="process-step" ng-repeat="stateItem in data.processFlow.items">
        <button type="button" disabled="disabled" class="btn btn-default btn-circle" ng-if="c.data.currentValue!=stateItem"><i class="fa fa-check fa-3x" aria-hidden="true"></i></button>
        <button type="button" disabled="disabled" class="btn btn-success btn-circle" ng-if="c.data.currentValue==stateItem"><i class="fa fa-check fa-3x" aria-hidden="true"></i></button>  
        <p>{{stateItem.label}}</p>       	
      </div>
    </div>
  </div>
 </div>
```

***CSS/SCSS***
- Copy and paste below `CSS` in Widget's CSS/SCSS Section
```CSS
.btn-circle {
  width: 40px;
  height: 40px;
  text-align: center;
  padding: 6% 0;
  font-size: 6px;
  line-height: 0.6;
  border-radius: 100%;
}

.process-row {
    display: table-row;
}

.process {
    display: table;     
    width: 100%;
    position: relative;
}

.process-step button[disabled] {
    opacity: 1 !important;
    filter: alpha(opacity=100) !important;
}

.process-row:before {
    top: 20px;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 100%;
    height: 1px;
    background-color: #ccc;
    z-order: 0;
    
}

.process-step {    
    display: table-cell;
    text-align: center;
    position: relative;
    padding-left: 0%;
    padding-right: 5%;
}

.process-step p {
    margin-top:10px;
    
}

.btn-circle.active {
    border: 2px solid #cc0;
}

```

***Server Side Scripts***
- Copy and Paste below `Server-Side Script` in Widget's Server Side Section
```javascript
(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

	data.table  = $sp.getParameter("table");
	data.sys_id = $sp.getParameter("sys_id");

	var gr = new GlideRecord(data.table);
  gr.get(data.sys_id);
  
	var spUtils = new PortalUtils();
  spUtils.getProcessFlows(data,data.table,(data.sys_id == -1),gr);
  
```

## Step 2: Create a Script Include
***Go to Script Includes (System Definition) > Click New***
- Name: PortalUtils
- Accessible from: This application scope only
- Copy and Paste below Server-Side Script in Script Section:
```javascript

  var PortalUtils = Class.create();
  PortalUtils.prototype = Object.extendsObject(PortalUtilsBase, {
	initialize: function() {
	},
	type: 'PortalUtils'
});
```
- Click on `Submit` button.

***Go to Script Includes (System Definition) > Click New***
- Name: PortalUtilsBase
- Accessible from: This application scope only
- Copy and Paste below Server-Side Script in Script Section:
```javascript
var PortalUtilsBase = Class.create();
PortalUtilsBase.prototype = {
	initialize: function() {
  },

getProcessFlows: function(data,table,newRecord, grRecord){
		data.processFlow = {show:false, items:[]};
		
		var grProcessStates = new GlideRecord('sys_process_flow');
		grProcessStates.addQuery("table", table);
		grProcessStates.addQuery("active",true);
		grProcessStates.orderByDesc('order');
		grProcessStates.query();
		
		var matchingFound = false;
		
		while(grProcessStates.next()) {
			data.processFlow.show = true;
			
			var item = {};
			
			item.label = grProcessStates.getValue("label");
			
			if(newRecord){
				item.class_name = "disabled";
			}else if(GlideFilter.checkRecord(grRecord,grProcessStates.getValue("condition"))){
				item.class_name = "completed active";
				matchingFound = true;
			}else{
				if(matchingFound)
					item.class_name = "completed active";
				else
					item.class_name = "disabled";
			}
			
			data.processFlow.items.unshift(item);
		}
		
		if(newRecord && data.processFlow.show && data.processFlow.items.length > 0){
			data.processFlow.items[0].class_name = "active";
		}
 	},

  	type: 'PortalUtilsBase'
};
```
- Click on `Submit` button.

## Step 3: Create a new Page
***Go to Service Portal > Page > Click New***
- Name: process_flow - Test Page
- ID: process_flow
- Click on `Submit` button.
- Once submitted, Click on `Open in Page Designer` related link
- In Page designer, Place `Process Flow` widget inside a container > row > Column at top location.
- View paget from following link `http://instance-name.service-now.com/sp?id=process_flow`. 