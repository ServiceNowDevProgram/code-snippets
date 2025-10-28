var ExcelParser = Class.create();
ExcelParser.prototype = {
    initialize: function() {
    },

    readData: function(attachmentID) {
        //Initialize the GlideSysAttachment call for retrieval of our sheet
        var attachment = new GlideSysAttachment();
        var attachmentStream = attachment.getContentStream(attachmentID);

        //Begin to parse the excel sheet for relevant data
        var parser = new sn_impex.GlideExcelParser();
        parser.parse(attachmentStream);
        parser.setHeaderRowNumber(1);
        var headers = parser.getColumnHeaders(); // Array of headers
        var excelData = []; // An array that will hold the data from each line as an object

        while (parser.next()) {
            var row = parser.getRow();
            if (JSUtil.notNil(row))
                excelData.push(row);
        }
        return excelData;
    },

    type: 'ExcelParser'
};
