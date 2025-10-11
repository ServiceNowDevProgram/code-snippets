(function executeRule(gForm, gUser, gSNC) {
    var attachments = gForm.getAttachments();
    if (!attachments || attachments.length === 0) {
        gForm.addErrorMessage("You must attach at least one file.");
        return false;
    }

    if (attachments.length > 3) {
        gForm.addErrorMessage("You can only upload up to 3 files.");
        return false;
    }

    var allowedTypes = ['pdf', 'png'];
    for (var i = 0; i < attachments.length; i++) {
        var fileName = attachments[i].file_name.toLowerCase();
        var ext = fileName.split('.').pop();
        if (!allowedTypes.includes(ext)) {
            gForm.addErrorMessage("Only PDF and PNG files are allowed.");
            return false;
        }
    }

    return true;
})(gForm, gUser, gSNC);
