var ReturnRecord = Class.create();
ReturnRecord.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    returnRecordObject: function() {
        var tableName = this.getParameter('sysparm_tableName');
		var recordID = this.getParameter('sysparm_recordID');

        var getRecord = new GlideRecord(tableName);
        getRecord.addQuery('sys_id', recordID);
        getRecord.query();
        var obj = {};

        if (getRecord.next()) {
            obj.short_description = getRecord.getValue('short_description');
            obj.sys_id = getRecord.getValue('sys_id');
        }

        return JSON.stringify(obj);
    }
});