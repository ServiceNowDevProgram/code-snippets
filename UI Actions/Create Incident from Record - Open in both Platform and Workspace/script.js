//Placed in the Script field of the UI Action, in order to work on Workspace the Workspace Form Action button/or menu must be checked
var incGr = new GlideRecord('incident');
incGr.newRecord();
incGr.setValue('caller_id', current.getValue('contact')); //This can be whatever field your record is housing the user in, this example is from the Case record.
incGr.setValue('short_description', current.short_description);
incGr.insert();
action.openGlideRecord(incGr);
