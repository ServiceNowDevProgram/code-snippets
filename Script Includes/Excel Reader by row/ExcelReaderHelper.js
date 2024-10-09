var ExcelReaderHelper = Class.create();
ExcelReaderHelper.prototype = {

    /**
     * Initializes the function with the attachmentId parameter.
     *
     * @param {type} attachmentId - The sys_id of the Excel file attachment.
     */
    initialize: function(attachmentId) {
        if (!attachmentId) {
            throw (gs.getMessage("Please provide the attachment sys_id for the Excel file"));
        }

        this.attachmentId = attachmentId;
    },

    /**
     * Iterates over each row in the worksheet and calls the provided callback function for each row. Assumes the first sheet has the data
     *
     * @param {function} callback - The callback function to be called for each row.
     * @throws {string} Throws an error message if the Excel file cannot be parsed.
     */
    forEachRow: function(callback) {
        var attachment = new GlideSysAttachment();
        // Use the attachment sys_id of an Excel file
        var attachmentStream = attachment.getContentStream(this.attachmentId);

        var parser = new sn_impex.GlideExcelParser();
        // Set the source to be parsed
        parser.setSource(attachmentStream);
        parser.setSheetNumber("0"); // Assuming sheet 1 has data for now
        parser.setNullToEmpty(true);

        // Parse each worksheet set using setSheetName()
        if (parser.parse()) {
            // var headers = parser.getColumnHeaders();

            // Iterate over each row in the worksheet
            while (parser.next()) {
                var row = parser.getRow();
                callback(row);
            }
        } else {
			var message = gs.getMessage("Unable to parse the Excel file.") + parser.getErrorMessage();
            throw (message);
        }
    },

    type: 'ExcelReaderHelper'
};