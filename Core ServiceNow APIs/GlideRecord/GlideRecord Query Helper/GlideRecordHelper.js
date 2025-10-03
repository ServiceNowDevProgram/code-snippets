/**
 * GlideRecordHelper - Simplifies querying records in ServiceNow
 * Usage:
 *   var helper = new GlideRecordHelper('incident');
 *   var records = helper.getRecords({ priority: 1, active: true });
 *   records.forEach(function(record) {
 *     gs.info(record.number);
 *   });
 */

var GlideRecordHelper = Class.create();
GlideRecordHelper.prototype = {
    initialize: function(tableName) {
        this.tableName = tableName;
    },

    getRecords: function(queryObj) {
        var gr = new GlideRecord(this.tableName);
        gr.addQuery('sys_id', '!=', ''); // basic filter to avoid empty queries

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
