(function executeRule(current, previous /*null when async*/ ) {

    if (current.table_name == 'incident') {

        // Fetch the file name of the uploaded attachment
        var fileName = current.getValue('file_name');

        // Fetch allowed extensions from system property (comma-separated, lowercase)
        var allowedExtensions = gs.getProperty('attachment.format.allowedExtensions', 'pdf,docx,png,jpg')
            .toLowerCase()
            .split(',');

        var fileExtension = '';
        if (fileName && fileName.indexOf('.') !== -1) {
            fileExtension = fileName.split('.').pop().toLowerCase();
        }

        // If file extension not allowed — prevent insert
        if (allowedExtensions.indexOf(fileExtension) === -1) {
            gs.addErrorMessage('File type "' + fileExtension + '" is not allowed. Allowed types: ' + allowedExtensions.join(', '));
            gs.log('Attachment blocked: Disallowed file type "' + fileExtension + '" for table ' + current.table_name);
            current.setAbortAction(true);
            return false;
        }
    }
})(current, previous);
