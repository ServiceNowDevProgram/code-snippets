var CheckRelatedListRecord = Class.create();
CheckRelatedListRecord.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    // Glide Record to the particular table and then query and get the record and setlimit only for one record to avoid unnecessary querytime.
    hasRecord: function() {

        var relatedTable = this.getParameter('sysparm_related_table');
        var referenceField = this.getParameter('sysparm_reference_field');
        var recordSysId = this.getParameter('sysparm_record_sys_id');

        var gr = new GlideRecord(relatedTable);
        gr.addQuery(referenceField, recordSysId);
        gr.setLimit(1);
        gr.query();
        return gr.hasNext() ? 'true' : 'false';

    },
    type: 'CheckRelatedListRecord'
});