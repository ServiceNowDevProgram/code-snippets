 var excelAttachment = Class.create();
excelAttachment.prototype = {
    initialize: function() {},
    addExcelAttachment: function(table, recordId, fileName, row, headerColumns) //RecordId is a sysid of the record for the attachment
    {
        /* headerColumns variable should contains the comma seperated headers for excel header for ex: Number,Summary,Description,Requester
        Row variable should be a JSON Array for ex: [{'number':'inc000001','short_description':'test'}] */

        var attachment = new Attachment();
        fileName = fileName + ".csv";
        var content_type = 'text/csv';
        var fileBytes = '';
        fileBytes += headerColumns.toString() + "\n";
        
        for (var i = 0; i < row.length; i++) {
			var jsRow = row[i];
            for (var j in jsRow) {
                fileBytes += jsRow[j] + ',';
            }
            fileBytes += '\n';
        }
        var attachmentRec = attachment.write(table, recordId, fileName, content_type, fileBytes);
		
		return attachmentRec;
    },
    type: 'excelAttachment'
};
