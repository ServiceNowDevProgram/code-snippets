/********************************************************************************/
Input:
attachmentQuery - Pass an encoded query to access the CSV attachment

Output:
Logs each rows and columns in the CSV file, use according to your logic

/********************************************************************************/

function parseCSVFile(attachmentQuery) {
    var attachmentRecord = new GlideRecord("sys_attachment");
    attachmentRecord.addEncodedQuery(attachmentQuery);
    attachmentRecord.query();
    if (attachmentRecord.next()) {
        var stringUtil = new GlideStringUtil();
        var sysAttachment = new GlideSysAttachment();
        //Get the attachment content in bytes
        var bytesData = sysAttachment.getBytes(attachmentRecord);
        // Encoded and decode the attachment content into a string
        var encData = stringUtil.base64Encode(bytesData);
        var decData = stringUtil.base64Decode(encData) + '';

        //Specify seperator and quote character to parse correctly
        var delimiter = ',';
        var quoteCharacter = '"';
        //Split into different rows
        var csvArray = decData.split("\r\n");
        for (var row in csvArray) {
            if (!!csvArray[row]) {
                //Parse each row through the parser and extract each columns
                var csvParser = new sn_impex.CSVParser().parseLineToArray(csvArray[row], delimiter, quoteCharacter);
                //Depending on number of columns, specify array index to access or loop them
                gs.info(row + " - " + csvParser[0] + " - " + csvParser[1]);
            }
        }
    }
}
