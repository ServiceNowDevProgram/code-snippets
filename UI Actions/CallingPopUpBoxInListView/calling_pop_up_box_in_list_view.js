function showExceptiondialog() {
    // Alert to display the checked records
    alert(g_list.getChecked());
    
    // Check if any records are selected in the list
    if ((g_list.getChecked()).length > 0) {
        var title = getMessage("Remediation Task");
        var dialogClass = GlideModal || GlideDialogWindow;
        
        // Initialize the modal dialog with a custom UI page
        var dialog = new dialogClass("incident_pop_up", true, 750);
        dialog.setTitle(title);
        
        // Pass selected record sys_ids as parameters to the UI page
        dialog.setPreference("sysparm_sys_id", g_list.getChecked());
        
        // Render the modal dialog
        dialog.render();
    } else {
        // Show error messages if no records are selected
        g_form.addErrorMessage(getMessage('Please Select Vulnerable Items before creating remediation'));
        alert('Please Select Vulnerable Items before creating remediation');
    }
}
