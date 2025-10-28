(function executeRule(current, previous /*null when async*/ ) {
    /*
	Fire this BR when a tag is removed/deleted from a record.
	Retrieve the tag name, the user who removed the tag, and the tag removal date.
	Update the above information onto the tag-referenced record in this example, In this example its incident record
	*/
    var updateRecord = new GlideRecord(current.table);
    if (updateRecord.get(current.table_key)) {
        var notes = "Tag Name:" + " " + current.label.getDisplayValue() + "\n" + "Tag Removed By:" + " " + current.sys_updated_by + "\n" + "Tag Removed On:" + " " + current.sys_updated_on;
        //updateRecord.setValue("work_notes", notes);
        updateRecord.work_notes = notes;
        updateRecord.update();
    }
})(current, previous);
