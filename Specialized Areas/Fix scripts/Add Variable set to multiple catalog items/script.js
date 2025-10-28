var itemIds = ['sys_id1','sys_id2','sys_id3']; // comma separated sys_id's of catalog items
for(var i=0; i<itemIds.length; i++){
  addDefaultVariableSet(itemIds[i],'sys_id of Variable set here');
}
function addDefaultVariableSet(catItemSysId,VarSetID) {
var varset = new sn_sc.CatalogItemVariableSetM2M();
//prepare object of columns name to Value of table io_set_item
var attr = {
"variable_set": VarSetID, //mandatory attribute
"sc_cat_item": catItemSysId, //mandatory attribute
"order": 100 // optional
};
varset.setAttributes(attr); // user setAttributes
var m2mRec = varset.create(true);
}
