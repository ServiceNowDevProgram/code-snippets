(function executeRule(current, previous /*null when async*/) {
  var dup = new GlideRecord('incident');
    dup.addQuery('caller_id', current.caller_id);
    dup.addQuery('short_description', current.short_description);
    dup.addQuery('state', '!=', 6); // Exclude closed
    var sevenDaysAgo = new GlideDateTime();
    sevenDaysAgo.addDaysUTC(-7);
    dup.addQuery('sys_created_on', '>=', sevenDaysAgo);
    dup.query();

    if (dup.next()) {
        // Build URL dynamically based on instance name
        var instanceName = gs.getProperty('instance_name'); 
        var url = gs.getProperty('glide.servlet.uri') + 'incident.do?sys_id=' + dup.sys_id;

        // Add info message with hyperlink
        gs.addInfoMessage("A similar incident <a target='_blank' href='" + url + "'>" + dup.number + "</a> already exists (created within the last 7 days).");

        // Stop creation of duplicate
        current.setAbortAction(true);
    }
})(current, previous);
