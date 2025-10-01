var q = new GlideAggregate('alm_asset');
q.addAggregate('COUNT', 'asset_tag');
q.groupBy('asset_tag');
q.addHaving('COUNT', '>', '1'); 
//q.addQuery('sys_updated_by','')
q.query();
var listOfDupes = new Array();
while (q.next()) {
gs.info(q.getRowCount());
	listOfDupes.push(q.getValue('asset_tag'));        
}
