/* 
UI Action
   Client - true
   action name - open_item
   show update - true ( As per your requirement)
   onClick - openItem();
   Workspace Form button - true
   Format for Configurable Workspace - true 
*/

//Workspace client script: 
function onClick() {
    var result = g_form.submit('open_item');
    if (!result) {
        return;
    }
    result.then(function() {
        var params = {};
        params.sysparm_parent_sys_id = g_form.getUniqueValue();
        params.sysparm_shortDescription = g_form.getValue('short_description');
        //add params as required, These params can be parsed and used in the record producer.
        g_service_catalog.openCatalogItem('sc_cat_item', 'recordproducer_sysid_here', params); 
        //Use the record producer sys_id in second parameter.
    });
}
