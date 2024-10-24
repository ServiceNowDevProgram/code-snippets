Once this code snippet is added in a new transform data broker in sys_ux_data_broker_transform table, this will start showing up in UIB data resources. 
Once the data resource is added to the page of any experience, the user only needs to input the property_name field and rest will be take care of. 
Just a note that in the data broker record properties field, please add below json object:
[ { "name": "property_name", 
"label": "Property", 
"fieldType": "string",
"readOnly": false, 
"mandatory": true, 
"defaultValue": "", 
"description": "System property name" } ]
