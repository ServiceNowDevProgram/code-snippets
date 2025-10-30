// This script script updates Incident Record from Record Producer
// Create a Record Producer and add script under producer script

new global.GlideQuery('incident').where('sys_id', producer.incident_number).update({
    short_description: producer.short_description
});
gs.addInfoMessage('Record Updated Successfully');
current.setAbortAction(true);
