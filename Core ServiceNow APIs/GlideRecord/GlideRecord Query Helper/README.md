# GlideRecordHelper for ServiceNow

A simple utility class to help ServiceNow developers query records using GlideRecord with cleaner syntax.

## How to Use


var helper = new GlideRecordHelper('incident');
var records = helper.getRecords({ priority: 1, active: true });

records.forEach(function(record) {
    gs.info(record.number);
});
