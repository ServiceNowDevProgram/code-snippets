// Call this function from OnClick field of UI Action form
function ClientSideScript() {
    var answer = confirm("Are you sure you want to set priority as Critical?");
    if (answer == true) {
        g_form.setValue('assigned_to', g_user.userID);
        g_form.setValue('impact', 1);
        g_form.setValue('urgency', 1);
        g_form.setValue('description', g_form.getValue('description') + "\nPriority is set to Critical by " + g_user.getFullName());
    }
