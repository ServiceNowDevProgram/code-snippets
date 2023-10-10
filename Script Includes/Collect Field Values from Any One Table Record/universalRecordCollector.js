var HM_Record_Details = Class.create();
DV_Record_Details.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getDetails: function() {
        var table = this.getParameter('sysparm_table');
        var recordID = this.getParameter('sysparm_recordID');
        var fieldNames = this.getParameter('sysparm_fieldNames');
		
	var fields = fieldNames.split(',');
		
        var targetRecord = new GlideRecord(table);
        targetRecord.addQuery('sys_id', recordID);
        targetRecord.query();

        var obj = {};

        if (targetRecord.next()) {
            for (var i = 0; i < fields.length; i++) {
                if (targetRecord.isValidField(fields[i])) {
                    obj[fields[i]] = targetRecord.getValue(fields[i]);
                }
            }
        }

        return JSON.stringify(obj);
    },

    type: 'DV_Record_Details'
});
