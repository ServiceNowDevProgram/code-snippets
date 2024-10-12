/********************************************************************************/
Input:
attachmentQuery - Pass sysId CSV attachment

Output:
converted into object from CSV

/********************************************************************************/

function parseCSVFile(sysId) {
    var attachmentRecord = new GlideRecord("sys_attachment");
    attachmentRecord.get(sysId);
    attachmentRecord.query();

    if (attachmentRecord.next()) {
        var stringUtil = new GlideStringUtil();
        var sysAttachment = new GlideSysAttachment();
        var bytesData = sysAttachment.getBytes(attachmentRecord);
        var encData = stringUtil.base64Encode(bytesData);
        var decData = stringUtil.base64Decode(encData) + '';

        var delimiter = ',';
        var quoteCharacter = '"';
        var csvArray = decData.split("\r\n");

        var index = 0
        var result = [];
        for (index = 0; index < csvArray.length; index++) {
            var row = csvArray[index];
            if (row) {
            var csvParser = new sn_impex.CSVParser().parseLineToArray(row, delimiter, quoteCharacter);
            var rowObject = {};
            for (var i = 0; i < csvParser.length; i++) {
                rowObject['column' + (i + 1)] = csvParser[i];
            }
            result.push(rowObject);
            }
        }
        return result;
    }
}