function checkCSVHeaders(grAttachment, separator, acceptedColumns, reverseMatch) {

    var i = 0, l = 0;

    // Arrays of file columns and their corresponding lower case version
    var lcAcceptedColumns = [], attColumns = [], lcAttColumns = [];

    // Returned object
    var result = {
        error: false,
        unknownColumns: [],
        missingColumns: []
    };

    // Get the first line of the attachment (only support CSV for now)
    var firstLine = '';

    if (grAttachment.getValue('content_type') == 'text/csv') {

        // A pointer to the attachment in streaming mode
        var attachmentContentStream = (new GlideSysAttachment()).getContentStream(grAttachment.getValue('sys_id'));

        // Read the first line 
        firstLine =  new GlideTextReader(attachmentContentStream).readLine();

    } else {

        return undefined;
    }   

    // Remove all Byte Order Mark that may have been hidden in the CSV file
    firstLine = firstLine.replace(/\uFEFF/g, '');

    // Exit now if the first line has nothing
    if (JSUtil.nil(firstLine)) {

        return undefined;

    } else {

        // Make sure all accepted column names are in LC
        lcAcceptedColumns = acceptedColumns.map(function(value) {
            return value.toLowerCase();
        });

        // Get a lowercase version of all the columns of the attachement
        attColumns = firstLine.split(separator);
        lcAttColumns = attColumns.map(function(value) {
            return value.toLowerCase();
        });

        // Verify that all the columns of the template are accepted
        for (i = 0, l = lcAttColumns.length; i < l; i++) {
            if (lcAcceptedColumns.indexOf(lcAttColumns[i]) == -1) {
                result.unknownColumns.push('"' + attColumns[i] + '"');
            }
        }
        // Optionally, verify that we're not missing any columns in the template
        if (reverseMatch) {
            for (i = 0, l = lcAcceptedColumns.length; i < l; i++) {
                if (lcAttColumns.indexOf(lcAcceptedColumns[i]) == -1) {
                    result.missingColumns.push('"' + acceptedColumns[i] + '"');
                }
            }
        }
    }

    result.error = ((result.unknownColumns.length > 0) || (result.missingColumns.length > 0));
    return result;
}

// Testing the function by reading the attachment of a data source (could work with any record type though)

var checkMissingColumns = true;

var grAttachment = (new GlideSysAttachment()).getAttachments('sys_data_source', '01177d530a2581020015e062c8ef3bda');

while (grAttachment.next()) {

    var headersCheck = checkCSVHeaders(grAttachment, ',' , ['First Name', 'Last Name', 'Country'], checkMissingColumns);
    if (headersCheck.error) {
        gs.debug('File ' + grAttachment.getValue('file_name') + ':');
        gs.debug('The following columns are unknown: ' + headersCheck.unknownColumns.join(', '));
        if (checkMissingColumns) {
            gs.debug('The following columns are missing: ' + headersCheck.missingColumns.join(', '));
        }
    }

}
