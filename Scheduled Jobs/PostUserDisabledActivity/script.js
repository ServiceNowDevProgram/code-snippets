/*
Get today's deactivated users records
*/
var grUserRecords = JSON.parse(new global.glide_record_functions().getTableRecords('sys_user', 'sys_updated_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()^active=false^u_disabled_due_to_inactivity=false', 'sys_id'));
if (grUserRecords.length > 0) {
    //Take action on individual record
    for (var i = 0; i < grUserRecords.length; i++) {
        gs.eventQueue('actions.post.user.account.disabled', current, grUserRecords[i].sys_id);
    }
}
