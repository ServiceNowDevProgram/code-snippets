//run this as a background script (scripts - background module) and then copy/paste the results into Excel, then do a split on columns, and select delimited and choose the pipe symbol.
//replace <<names>> with application names to check new versions that have been modified from OOTB
//Initial author credit to gary.opela@servicenow.com

var grVers = new GlideRecord('sys_update_version');
grVers.addEncodedQuery('application.nameIN<<names>>'); //change <<names>>
grVers.query();

var msg = "\n\nUpdate Name|Type|Object Name|Application|Update Set|Action\n";

while (grVers.next()){
    var isOOTB = getOOTB(grVers.getValue('name'));
    if (isOOTB){
        msg += (grVers.getValue('name') + '|' + grVers.getValue('type') + '|' + grVers.getValue('record_name') + '|' + grVers.getDisplayValue('application') + '|' + grVers.getDisplayValue('source').replace('Update Set: ', '') + '|' + grVers.getValue('action') + '\n');
    }
}

gs.info(msg);

function getOOTB(updateName){
    var grU = new GlideRecord('sys_update_version');
    grU.addEncodedQuery("name=" + updateName + "^source_table!=sys_update_set");
    grU.query();
    if (grU.hasNext()){
        return true;
    }
    return false;
}
