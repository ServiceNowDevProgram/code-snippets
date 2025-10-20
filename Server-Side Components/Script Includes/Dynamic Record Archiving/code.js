var RecordArchiver = Class.create();
RecordArchiver.prototype = {
    initialize: function(tableName, dateField, archiveThresholdDays, archiveMode) {
        this.tableName = tableName;
        this.dateField = dateField;
        this.archiveThresholdDays = archiveThresholdDays;
        this.archiveMode = archiveMode || 'flag'; // 'flag' or 'move'
    },

    archiveRecords: function() {
        var thresholdDate = new GlideDateTime();
        thresholdDate.addDaysUTC(-this.archiveThresholdDays);

        var gr = new GlideRecord(this.tableName);
        gr.addQuery(this.dateField, '<=', thresholdDate);
        gr.query();

        var count = 0;
        while (gr.next()) {
            if (this.archiveMode === 'flag') {
                gr.setValue('u_archived', true); // Assumes a custom field 'u_archived'
                gr.update();
            } else if (this.archiveMode === 'move') {
                this._moveToArchiveTable(gr);
            }
            count++;
        }

        gs.info('Archived ' + count + ' records from ' + this.tableName);
    },

    _moveToArchiveTable: function(record) {
        var archiveGr = new GlideRecord(this.tableName + '_archive');
        archiveGr.initialize();

        var fields = record.getFields();
        for (var i = 0; i < fields.size(); i++) {
            var fieldName = fields.get(i).getName();
            if (archiveGr.isValidField(fieldName)) {
                archiveGr.setValue(fieldName, record.getValue(fieldName));
            }
        }

        archiveGr.insert();
        record.deleteRecord();
    },

    type: 'RecordArchiver'
};

// Example usage:
//var archiver = new RecordArchiver('incident', 'opened_at', 365, 'flag'); // Archive incidents older than 1 year
//archiver.archiveRecords();
