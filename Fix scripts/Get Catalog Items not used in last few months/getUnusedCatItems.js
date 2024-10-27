/* Below script can be used to find unused and Used catalog items (Including record producers) in last 15 Months

gs.info("------Used Catalog Items --------");

var usedItems = [];
var unusedItems = [];
var ritm = new GlideAggregate('sc_req_item');
ritm.addEncodedQuery('sys_created_onRELATIVEGT@month@ago@15');
ritm.groupBy('cat_item');
ritm.query();
while (ritm.next()) {
    usedItems.push(ritm.getValue('cat_item'));
    gs.info(ritm.getDisplayValue('cat_item'));
}

var recGr = new GlideAggregate('sc_item_produced_record');
recGr.addEncodedQuery('sys_created_onRELATIVEGT@month@ago@15');
recGr.groupBy('producer');
recGr.query();
while (recGr.next()) {
    usedItems.push(recGr.getValue('producer'));
    gs.info(recGr.getDisplayValue('producer'));
}
gs.info("------Unused Catalog Items --------");
var unusedCatalogItems = new GlideRecord('sc_cat_item');
unusedCatalogItems.addQuery('sys_id', 'NOT IN', usedItems.toString());
unusedCatalogItems.query();
while (unusedCatalogItems.next()) {
    gs.info(unusedCatalogItems.name);
    unusedItems.push(unusedCatalogItems.getUniqueValue());
}
