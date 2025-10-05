//Business Rule: After update on the incident table
//Condition: Additional comments changes
//Create on global Tag record ex: Comments added

(function executeRule(current, previous /*null when async*/ ) {

    var caller = current.caller_id.user_name;
// Add tag to the incident record if the comments is updated by the caller
    if (current.sys_updated_by == caller) {
        var add_tag_entry = new GlideRecord('label_entry');
        add_tag_entry.initialize();
        add_tag_entry.label = '<sys_id  of the Tag>';
        add_tag_entry.table = 'incident';
        add_tag_entry.table_key = current.sys_id;
        add_tag_entry.insert();
    } else {
// Remove tag from the incident record if the agent responds back to the caller
        var remove_tag_entry = new GlideRecord('label_entry');
        remove_tag_entry.addEncodedQuery("label=<sys_id of the Tag>^table_key=" + current.sys_id);
        remove_tag_entry.query();
        if (remove_tag_entry.next()) {
            remove_tag_entry.deleteRecord();
        }
    }

})(current, previous);
