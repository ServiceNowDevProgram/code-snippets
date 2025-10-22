var updatedSysIds = [];
var notUpdatedSysIds = [];

var gr = new GlideRecord('< table_name >');
gr.addQuery('< query condition >');
gr.query();

while (gr.next()) {

    var relCi = new GlideRecord('cmdb_rel_ci');
    relCi.addQuery('child', gr.sys_id);
    relCi.addQuery('parent.sys_class_name', '< backend name of the table to which the reference field is referred to >');
    relCi.query();

    if (relCi.next()) {
        // Update the reference field with the referenced table's sys_id
        gr.< reference field backend name > = relCi.parent.sys_id;
        gr.setWorkflow(false); 
        gr.update();
        updatedSysIds.push(gr.sys_id.toString()); // Add to updated list
    } 
	else {
        notUpdatedSysIds.push(gr.sys_id.toString()); // Add to not updated list
    }
}

// Print the sys_ids of the records updated and not updated
gs.print("Updated records sys_ids: " + updatedSysIds.join(', '));
gs.print("Not updated records sys_ids: " + notUpdatedSysIds.join(', '));
