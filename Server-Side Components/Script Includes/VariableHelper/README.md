## Variable Helper

 Working with variables in ServiceNow is no fun sometimes, especially [Multi Row Variable Sets](https://docs.servicenow.com/bundle/paris-application-development/page/script/server-scripting/concept/c_ScriptableServiceCatalogVariables.html#d2332110e207).  For that reason I created a helper Script Include to make my life easier.  

 There are 4 parameters that can be passed as an object when instantiating the Script Include or after with setter functions.  All default to false;


 * <b>useDisplayValue</b>:  This will return the display value of all variables instead of value
 * <b>expandRef</b>      :  This will return any reference field as an object. 
 * <b>useLabel</b>       :  Variable/Field Labels will be used instead of name.
 * <b>debug</b>          :  Enable additional logging


### Example

```
var helperOptions = {
  "useLabel": true,
  "useDisplayValue": true ,
  "expandRef": false
};
var varHelper = new variableHelper(helperOptions); 
varHelper.setDebug(true); //example of using setter function

var myVariables = varHelper.getVariables(myGlideRecordObject); //Get an object containing all variables
var myMRVS = varHelper.getMRVS(myGlideRecordObject.variables[mrvsName]); //Get a specific MRVS as an array of objects
  
```
