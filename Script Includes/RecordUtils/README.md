
# Record Utils

Provides utility functions to retrieve record information.

## Note: 
It is part of a case management application built with App Engine. Contact me for more information.
 
 # Usage

The getSysId() function is useful in a Catalog Client Script to set field values in a catalog item

```javascript
var sysId_of_OhioLocation = new x_snc_ecms.RecordUtils().getSysId('cmn_location', 'name=Ohio');
gs.info ( "SysId of Ohio Location: " + sysId_of_OhioLocation) ;
gs.info ( "It should be equal to : " + "1a3e85f037d0200044e0bfc8bcbe5d2c") ;
```

 # Notes
When you copy this script into your scoped application, make sure to set the value of "Accessible from" in the Script Include form to "All application scopes". Otherwise you will get this error: "Illegal access to private script include Calculator in scope <script scope> being called from scope <your scope>", 
