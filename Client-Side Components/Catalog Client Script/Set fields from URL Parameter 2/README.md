# Set fields on a catalog item from URL parameters.

The mission was to get a sys_id from the URL, query a record and return a value to the front-end.

In the front-end we have a Record Producer (RP) with a String field.

On the onLoad event, we want to populate the field in order to show the value retrieved from the back-end.

The Use Case is defined so let's go to the step by step process.

1. Create a Util class in the back-end

Our Utils class will be a Script Include that receives a sys_id and returns a String. 

[KMXOUtils](KMXOUtils.js) 

2. Create a class to provide access for the Front-End

2.1. To provide access in this class, the parameter Client callable should be True (checked)

[UtilsAjax](UtilsAjax.js) 

3. I'll suppose that you have a String field called task_number in your RP

3.1. Create a Catalog Client Script (Type: OnLoad) to get the URL parameter and call the back-end class:

[CatalogClientScript](CatalogClientScript.js) 
