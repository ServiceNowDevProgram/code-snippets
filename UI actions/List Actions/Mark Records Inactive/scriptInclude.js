var MarkRecordsInactive = Class.create();
MarkRecordsInactive.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    markInactiveRecords: function() {
        var sysIds = this.getParameter('sysparm_ids');
        var tableName = this.getParameter('sysparm_table');
        
		var recs = new GlideRecord(tableName);
		recs.addEncodedQuery('sys_idIN'+sysIds);
		recs.query();
		while(recs.next())
			{
				recs.active = false;
				recs.update();
			}
		return 'All the selected records are marked Inactive';
    },
    type: 'MarkRecordsInactive'
});
