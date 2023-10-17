var ActivityStreamCollector = Class.create();
ActivityStreamCollector.prototype = {
    initialize: function(tableName, recordSysId) {
        this.tableName = tableName;
        this.recordSysId = recordSysId;

        this.arrayUtil = new global.ArrayUtil();
        this.users = {};
    },

    /**
     * This function collects the activity elements of a record and gives back the result as a JSON array
     */
    getActivityEntries: function() {

        var historyArray = [];

        var hw = new sn_hw.HistoryWalker(this.tableName, this.recordSysId);
        // Get the first (original element)
        hw.walkTo(0);
        // This record is used for collecting the initial field values
        var currentRec = hw.getWalkedRecord();

        // As a first step we need to know which audited fields are shown on the record's form  
        var activityFields = gs.getProperty('glide.ui.' + this.tableName + '_activity.fields', "");
        // This definition is a comma separated list, which we need to convert as an array
        activityFields = activityFields.split(",");

        // Collect the initial data
        var initialHistoryData = this._getFirstHistory(currentRec, activityFields);

        // Walking through the history data
        while (hw.walkForward()) {
            var nextRec = hw.getWalkedRecord();

            // Get all field changes
            var fieldChanges = this._compareTwoRecords(currentRec, nextRec, activityFields);
            if (fieldChanges.fields.length > 0)
                historyArray.push(fieldChanges);

            currentRec = hw.getWalkedRecordCopy();
        }

        // Get Comments and Work Notes
        historyArray = this.arrayUtil.concat(historyArray, this._getNotesComments());

        // Get attachments
        historyArray = this.arrayUtil.concat(historyArray, this._getAttachments());

        // Sort the element by date desc.
        historyArray.sort(function(elem1, elem2) {
            var date1 = new GlideDateTime(elem1.date);
            var date2 = new GlideDateTime(elem2.date);
            if (date1 > date2) {
                return -1;
            } else if (date1 < date2) {
                return 1;
            } else {
                return 0;
            }
        });

        // Add initial data to the end of array
        // It is handled as a last step, because if the date of this activity is the same with the first action, de order is not correct.
        historyArray.push(initialHistoryData);

        var historyDataArray = [];
        for (var idx in historyArray) {
            var currentActivity = historyArray[idx];

            var activityValue;

            if (currentActivity.type == 'field_changes') {
                var fields = [];

                for (var idxElem in currentActivity.fields) {
                    var currentElem = currentActivity.fields[idxElem];
                    fields.push({
                        label: currentElem.label,
                        oldValue: currentElem.oldValue,
                        newValue: currentElem.newValue
                    });
                }

                activityValue = fields;
            } else if (currentActivity.type == 'attachment') {
                activityValue = currentActivity.fileName;
            } else {
                activityValue = currentActivity.text;
            }

            historyDataArray.push({
                createdBy: currentActivity.userName,
                createdOn: currentActivity.date,
                type: currentActivity.type,
                value: activityValue
            });
        }
        return historyDataArray;
    },


    /**
     * Get all attachments, which are related to the current record
     */
    _getAttachments: function() {
        var attachments = [];
        var saGr = new GlideRecord('sys_attachment');
        saGr.addQuery("table_name", this.tableName);
        saGr.addQuery("table_sys_id", this.recordSysId);
        saGr.query();
        while (saGr.next()) {
            attachments.push({
                date: saGr.getDisplayValue("sys_created_on"),
                userName: this._getUserDisplayName(saGr.getValue("sys_created_by")),
                type: "attachment",
                fileName: saGr.getValue("file_name")
            });
        }
        return attachments;
    },

    /**
     * This function collects and gives back the audited fields which are shown on the activity stream
     */
    _getFirstHistory: function(currGr, activityFields) {
        var fieldDataArray = [];

        for (var idxItem in activityFields) {
            var item = activityFields[idxItem];

            try {

                // In case of Work notes and Comments we can skip the process
                if (item == "work_notes" || item == "comments")
                    continue;

                var currentRecElem = currGr.getElement(item);
                // In case of no value it can be skipped
                if (gs.nil(currGr.getDisplayValue(item)))
                    continue;

                // Add the object to the array
                fieldDataArray.push({
                    name: item,
                    label: currentRecElem.getLabel(),
                    oldValue: "",
                    newValue: currGr.getDisplayValue(item),
                });
            } catch (err) {} // In order to handle some unexpected cases...
        }

        return {
            date: currGr.getDisplayValue("sys_created_on"),
            userName: this._getUserDisplayName(currGr.getValue("sys_created_by")),
            type: "field_changes",
            fields: fieldDataArray
        };
    },

    /**
     * This function compares two records and gets all audited fields, where the content is different
     */
    _compareTwoRecords: function(currGr, nextGr, activityFields) {

        var fieldDataArray = [];

        for (var idxItem in activityFields) {
            var item = activityFields[idxItem];
            var currentRecElem = currGr.getElement(item);
            var nextRecElem = nextGr.getElement(item);

            if (currentRecElem == nextRecElem)
                continue;

            fieldDataArray.push({
                name: item,
                label: currentRecElem.getLabel(),
                oldValue: currGr.getDisplayValue(item),
                newValue: nextGr.getDisplayValue(item),
            });
        }

        return {
            date: nextGr.getDisplayValue("sys_updated_on"),
            userName: this._getUserDisplayName(nextGr.getValue("sys_created_by")),
            type: "field_changes",
            fields: fieldDataArray
        };
    },

    /**
     * Get Work notes, Comments from a record
     */
    _getNotesComments: function() {

        var noteArray = [];

        var journalGr = new GlideRecord("sys_journal_field");
        journalGr.addQuery("name", this.tableName);
        journalGr.addQuery("element_id", this.recordSysId);
        journalGr.query();
        while (journalGr.next()) {
            noteArray.push({
                date: journalGr.getDisplayValue("sys_created_on"),
                userName: this._getUserDisplayName(journalGr.getValue("sys_created_by")),
                type: journalGr.getDisplayValue("element"),
                text: journalGr.getValue("value"),
            });
        }

        return noteArray;
    },

    /**
     * Get user display name
     */
    _getUserDisplayName: function(userName) {

        // A bit caching... 
        if (this.users[userName])
            return this.users[userName];

        var userGr = new GlideRecord("sys_user");
        if (userGr.get("user_name", userName)) {
            this.users[userName] = userGr.getDisplayValue("name");
            return this.users[userName];
        } else
            return "";
    },

    type: 'ActivityStreamCollector'
};
