
// your condition to apply the style e.g. user is a VIP user
var condition = true; // Set the condition as needed

// Find the control
var fieldToSetStyle = g_form.getControl('sys_display.incident.caller_id');


if (condition == true) {
    fieldToSetStyle.style.fontWeight = 'bold';
    fieldToSetStyle.style.backgroundColor = 'red';
} else  {
    fieldToSetStyle.style.fontWeight = 'normal';
    fieldToSetStyle.style.backgroundColor = 'white';
}