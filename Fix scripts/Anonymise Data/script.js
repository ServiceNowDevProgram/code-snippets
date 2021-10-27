var AnonymiseData = Class.create();
AnonymiseData.prototype = {
    initialize: function() {},

    //Generate UUID which will be placed instead of real data
    generateUUID: function() {
        return gs.generateGUID();
    },

    //Function to anonymise data of one record and specified field list
    //record - Gliderecord object of record to be cleared
    //fieldList - Array of fields name, which should be cleared ex. ['first_name', 'last_name']
    anonymiseRecord: function(record, fieldList) {
        for (index in fieldList) {
            if (!gs.nil(record.getValue(fieldList[index]))) {
                record.setValue(fieldList[index], this.generateUUID());
            }
        }
        record.update();
    },

    //Function to anonymise table with specified additional query and list of fields
    //tablename - Name of table to be cleared ex. 'sys_user'
    //fieldList - Array of fields name, which should be cleared ex. ['first_name', 'last_name']
    //additionalQuery - Additional encoded query to limit list of records (if you would like to clear whole table just pass empty string)
    //logging - True/False value to determine if logging should be executed during execution
    anonymiseTable: function(tablename, fieldList, additionalQuery, logging) {

        if (logging)
            gs.info('[AnonymiseData] - Starting clearing data on table: ' + tablename + ' for fields: ' + fieldList + ' and addiotonal query: ' + additionalQuery);

        var gr = new GlideRecord(tablename);
        if (!gs.nil(additionalQuery)) {
            gr.addEncodedQuery(additionalQuery);
        }
        gr.query();

        while (gr.next()) {
            this.anonymiseRecord(gr, fieldList);
        }

        if (logging)
            gs.info('[AnonymiseData] - Execution finished, cleared: ' + gr.getRowCount() + ' records.');
    },

    type: 'AnonymiseData'
};
