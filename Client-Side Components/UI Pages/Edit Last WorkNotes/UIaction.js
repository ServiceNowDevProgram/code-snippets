function openEditLastCommentModal() {
    var dialog = new GlideModal("edit_worknotes_comments_inc");
    dialog.setTitle('Edit Last WorkNotes/Additional Comments');
    dialog.setPreference('incid', g_form.getUniqueValue());	      	
    dialog.setWidth(550);
    dialog.render();
}
