function callme() {
    var dialog = new GlideModal("edit_comment_inc");

    //Set the dialog title
    dialog.setTitle('Edit last comment');
    dialog.setPreference('incid', g_form.getUniqueValue());
    //Set the dialog width		      	
    dialog.setWidth(550);

    //Display the modal
    dialog.render();
}
