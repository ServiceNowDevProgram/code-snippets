(function executeRule(current, previous /*null when async*/ ) {
    if (current.table_name == 'incident') { //here multiple tables can be looped I am just using incident table
        var maxSize = gs.getProperty('com.glide.attachment.max_size');
        maxSize = parseInt(maxSize, 10);
        if (current.size_bytes > maxSize) {
            var maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
            var attachmentSizeMB = (current.size_bytes / (1024 * 1024)).toFixed(2);
            // Prevent insert by setting error message
            gs.addErrorMessage("Attachment '" + current.file_name + "' size (" + attachmentSizeMB + " MB) exceeds the max allowed size of " + maxSizeMB + " MB. Please reduce the file size.");
            // Cancel the insert operation
            current.setAbortAction(true);
        }
    }
})(current, previous);
