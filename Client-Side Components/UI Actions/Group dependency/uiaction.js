/*
This script should be placed in the UI action on the table sys_user_group form view.
This UI action should be marked as client.
Use popupDependency() function in the Onclick field.
condition - gs.hasRole('admin') 
*/

function popupDependency() {
    var groupSysId = gel('sys_uniqueValue').value;
    var gdw = new GlideDialogWindow('display_group_dependency_list');
    gdw.setTitle('Group Dependency');
    gdw.setPreference('sysparm_group', groupSysId);
    gdw.render();
}
