var GlideRecordHelper = Class.create();
GlideRecordHelper.prototype = {
    initialize: function(tableName) {
        if (!tableName) {
            throw new Error("Table name is required.");
        }
        this.tableName = tableName;
    },

    getRecords: function(queryObj) {
        var gr = new GlideRecord(this.tableName);
        if (!gr.isValid()) {
            throw new Error("Invalid table name: " + this.tableName);
        }

        for (var key in queryObj) {
            if (queryObj.hasOwnProperty(key)) {
                gr.addQuery(key, queryObj[key]);
            }
        }

        gr.query();
        var results = [];
        while (gr.next()) {
            results.push(gr);
        }
        return results;
    },

    type: 'GlideRecordHelper'
};
