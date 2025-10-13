# Delete Incidents Older Than 90 Days – ServiceNow Script

This script is designed to run in the **Scripts - Background** module of ServiceNow. It identifies and deletes Incident records that were opened more than 90 days ago from the current date.

## 🧩 Purpose

To clean up old Incident records that are no longer relevant or needed, helping maintain a lean and efficient ServiceNow instance.

## 🛠️ Script Overview


(function() {
    var ninetyDaysAgo = new GlideDateTime();
    ninetyDaysAgo.subtract(1000 * 60 * 60 * 24 * 90); // 90 days in milliseconds

    var gr = new GlideRecord('incident');
    gr.addQuery('opened_at', '<', ninetyDaysAgo);
    gr.query();

    var count = 0;
    while (gr.next()) {
        gs.info('Deleting Incident: ' + gr.number);
        gr.deleteRecord();
        count++;
    }

    gs.info('Total Incidents Deleted: ' + count);
})();
