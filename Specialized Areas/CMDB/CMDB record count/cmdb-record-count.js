var out = '\n# of records,Table,Label\n'

var getForm = function () {
    var gq = new GlideRecord('sys_db_object');
    gq.addEncodedQuery('nameSTARTSWITHcmdb_ci_');
    gq.query();
    while (gq.next()) {
        var id = gq.getValue('sys_id');
        var tableName = gq.getValue('name');
        var label = gq.getDisplayValue('label');
        getCount(tableName, label)
    }
}

var getCount = function(tableName, label) {
	var agg = new GlideAggregate(tableName);
    agg.addAggregate('COUNT');
	agg.query();
	if (agg.next()) {
		var count = agg.getAggregate('COUNT');
        if (count > 0){
            out += count + ',' + tableName + ',' + label +'\n';
        }
	}
};

getForm();
gs.info(out);