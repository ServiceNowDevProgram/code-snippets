function onLoad() {
   
    var createdBy = g_form.getValue('sys_created_by');
    var loggedUser = g_user.userName;
    if (createdBy == loggedUser) {
       g_form.hideRelatedList('put your related list name here');
    }
 
}  