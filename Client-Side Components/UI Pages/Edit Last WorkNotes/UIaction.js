/**
 * Opens a modal to edit the last Work Notes or Additional Comments.
 * 
 * @description
 * This function is triggered by a form button (set to true),
 * with client-side execution enabled. It opens a GlideModal
 * using the UI macro "edit_worknotes_comments_inc" and sets
 * the current incident sys_id as a preference for use within the modal.
 *
 * Usage:
 * - Set Client = true
 * - Set OnClick = openEditLastCommentModal()
 * - Set Form Button = true
 */
function openEditLastCommentModal() {
    // Create and configure the GlideModal
    var dialog = new GlideModal("edit_worknotes_comments_inc");
    dialog.setTitle("Edit Last WorkNotes/Additional Comments");

    // Pass the current record's sys_id to the modal
    dialog.setPreference("incid", g_form.getUniqueValue());

    // Optional: Adjust modal width
    dialog.setWidth(550);

    // Render the modal
    dialog.render();
}
