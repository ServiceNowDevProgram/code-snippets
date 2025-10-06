// Business Rule: After Update on Incident table
// Condition: Changes to Additional Comments field
// Purpose: Add or remove a tag based on whether the update was made by the caller

(function executeRule(current, previous /*null when async*/) {

    // Replace this with the actual sys_id of the Tag record (e.g., for "Comments added")
    var TAG_SYS_ID = '<sys_id_of_the_Tag>';

    var callerUsername = current.caller_id.user_name;
    var updatedBy = current.sys_updated_by;

    if (updatedBy == callerUsername) {
        // Add tag if caller added the comment
        var tagGR = new GlideRecord('label_entry');
        tagGR.addQuery('label', TAG_SYS_ID);
        tagGR.addQuery('table_key', current.sys_id);
        tagGR.query();

        if (!tagGR.hasNext()) {
            var addTag = new GlideRecord('label_entry');
            addTag.initialize();
            addTag.label = TAG_SYS_ID;
            addTag.table = 'incident';
            addTag.table_key = current.sys_id;
            addTag.insert();
        }
    } else {
        // Remove tag if someone else (e.g., fulfiller) responded
        var removeTag = new GlideRecord('label_entry');
        removeTag.addQuery('label', TAG_SYS_ID);
        removeTag.addQuery('table_key', current.sys_id);
        removeTag.query();

        while (removeTag.next()) {
            removeTag.deleteRecord();
        }
    }

})(current, previous);
