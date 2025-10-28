//Enter the table name
var table = 'rm_story';

//Enter filer breadcrumbs, the script will multiply the records that match the conditions
var breadcrumbs = "short_descriptionSTARTSWITHexample";

//The script will create as many duplicates of the filtered records as many user SysIds you add to the "assignedToUsers" array
//Make sure that the user is a member of the Assignment group, or the record will be created without an assignee

var assignedToUsers = ["d2dd13ea1b2e919039f811739b4bcbe4", "dedd13ea1b2e919039f811739b4bcbdc"];

var gr = new GlideRecord(table);
gr.addEncodedQuery(breadcrumbs);
gr.query();
while (gr.next()) {
    //clone the old sysID for copying the attachments later
    var oldSysId = gr.sys_id.toString();

    for (var i = 0; i < assignedToUsers.length; i++) {
        //assign a the next available number on the table to the record
        gr.number = new NumberManager(table).getNextObjNumberPadded();
        //modify the Assign to value to the one in the array
        gr.assigned_to = assignedToUsers[i];
        //create the duplicate, and save the new record's sys_id
        var newSysId = gr.insert();
        //copy the attachments from the original record to the duplicated one
        new GlideSysAttachment().copy(table, oldSysId, table, newSysId);
        gr.update();
    }
}
