// Create a custom field on the ticket table to show ticket approval pending me
// Display Business Rule on a custom field
(function executeRule(current, gScripting) {
    if (current.custom_field) {
        current.custom_field = '<a href="' + ${URI_REF} + '/sysapproval_approver_list.do%3Fsysparm_query%3Dsysapproval%253D' + current.sys_id + '%255Estate%253Drequested%255EapproverDYNAMIC90d1921e5f510100a9ad2572f2b477fe%26sysparm_first_row%3D1%26sysparm_view%3D" target="_blank">Pending My Approval</a>';
    }
})(current, gScripting);
