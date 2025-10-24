/*
This script is used to add the [no_audit=true] attribute to multiple dictionary entries in bulk.
Can be used for other attributes as well. 
NB: The attribut sys_id must be verified before the script execution!
*/

var encodedQuery = '<insert encoded query here>'

//Verify this is in your instance before script execution
var noAuitAttributeSysID = '96ea04dfeb321100d4360c505206fe7d'; 

var grSD = new GlideRecord('sys_dictionary');
grSD.addEncodedQuery(encodedQuery);
grSD.query();
while (grSD.next()) {


    var grExistingAttribute = new GlideRecord('sys_schema_attribute_m2m');
    grExistingAttribute.addQuery('schema', grSD.getUniqueValue());
    grExistingAttribute.addQuery('attribute', noAuitAttributeSysID); //
    grExistingAttribute.query();

    if(grExistingAttribute.hasNext()){
        grExistingAttribute.next();

        if(grExistingAttribute.getValue('value')=='false'){
            grExistingAttribute.setValue('value', 'true');
            grExistingAttribute.update();
        }
    }else{

        var grDicitionaryAttributeM2M = new GlideRecord('sys_schema_attribute_m2m');
        grDicitionaryAttributeM2M.initialize();
        grDicitionaryAttributeM2M.setValue('schema', grSD.getUniqueValue());
        grDicitionaryAttributeM2M.setValue('attribute', noAuitAttributeSysID)
        grDicitionaryAttributeM2M.setValue('value', 'true');
        grDicitionaryAttributeM2M.insert();
    }

}
