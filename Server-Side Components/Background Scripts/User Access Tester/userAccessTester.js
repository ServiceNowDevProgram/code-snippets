var CONFIG = {
    tableName: 'incident',
    recordSysId: 'your_record_sys_id_here',
    userToImpersonate: 'user_sys_id_here',
    fieldsToTest: ['number', 'short_description', 'priority', 'assignment_group']
};

var originalUserID = gs.getUserID();
var impersonator = new GlideImpersonate();

gs.print("Original user: " + gs.getUser().getDisplayName());

impersonator.impersonate(CONFIG.userToImpersonate);
gs.print("Now impersonating: " + gs.getUser().getDisplayName());

var gr = new GlideRecordSecure(CONFIG.tableName);
if (gr.get(CONFIG.recordSysId)) {
    gs.print("Record accessible: " + gr.getDisplayValue());
    
    for (var i = 0; i < CONFIG.fieldsToTest.length; i++) {
        var field = CONFIG.fieldsToTest[i];
        var value = gr.getDisplayValue(field);
        gs.print("Field '" + field + "': " + (value || 'Empty/No access'));
    }
} else {
    gs.print("Record not found or not accessible");
}

impersonator.impersonate(originalUserID);
gs.print("Back to original user: " + gs.getUser().getDisplayName());
