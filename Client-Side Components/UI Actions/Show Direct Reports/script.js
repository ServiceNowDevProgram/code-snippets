/*
This script should be placed in the UI action on the table sys_user context menu .
client is unchecked
*/


try {

    var user = new GlideRecord('sys_user');
    user.addQuery('active', true);
    user.addQuery('manager', current.getUniqueValue());
    user.query();
    var count = user.getRowCount();
    if (count == 0) {

        gs.addInfoMessage('No Direct Reports found for the user.');
    } else {
        gs.addInfoMessage(count + ' Direct Reports found for the user.');
    }
    action.setRedirectURL('sys_user_list.do?sysparm_query=active!=false^manager=' + current.getUniqueValue()); // //Redirects to the list view

} catch (e) {
    gs.addErrorMessage('Failed in showing direct reportees  ' + e);
}
