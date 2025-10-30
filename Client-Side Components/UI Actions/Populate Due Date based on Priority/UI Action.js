/* 
Table - incident
Show Update - True
Form Button - True
Condition - (current.due_date == '' && current.priority != '5')

Input
1. Created Date
2. Priority

Validation
Will not appeare if the value is already there and the priority is 5

Output
1. Due Date

*/


// The function duedate is used to pass the priority and then created display value to the script include where the calculate of Due date is done will get the response and the set the value to the due_date field of incident.
function duedate() {

    var priority = current.getValue('priority');
    var created = current.getDisplayValue('sys_created_on');
    var si = new CalculateDueDates();
    var response = si.findDueDate(priority, created);
    var gdt = new GlideDateTime();
    gdt.setDisplayValue(response);
    current.setValue('due_date', gdt);
    current.update();
    action.setRedirectURL(current);

}
duedate();