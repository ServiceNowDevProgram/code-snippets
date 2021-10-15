function catalogTaskWithoutReqItem(){
    var gliderecordToCatalogTask = new GlideRecord('sc_task');
    gliderecordToCatalogTask.encodedQuery('request_itemISEMPTY');
    gliderecordToCatalogTask.query();
}
// catalogTaskWithoutReqItem();