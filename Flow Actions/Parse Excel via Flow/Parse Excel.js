(function execute() {
    // ... code ...

    var arr = [];

    var gratt = new GlideRecord('sys_attachment');
    gratt.addQuery('sys_id', "d82c84202bac5a10cac8fb806e91bf53"); //sys_id of the attachment
    gratt.addEncodedQuery('table_name=cases'); // table name where the excel is attached
    gratt.query();
    if (gratt.next() && gratt.file_name.indexOf(".xlsx") >= 0) {
        var parser = new sn_impex.GlideExcelParser();
        var attachment = new GlideSysAttachment();
        var attachmentStream = attachment.getContentStream(gratt.sys_id);
        parser.setSheetNumber(0);
        parser.setNullToEmpty(true);
        parser.parse(attachmentStream);
        var headers = parser.getColumnHeaders();
        //print headers

        var rows_info = [];
        // Iterate over each row in the worksheet
        while (parser.next()) {
            row = parser.getRow();
            gs.info("Shamma row" +headers.length);
            //gs.info("Shamma row" + row[headers[]].toString());
            for (var i = 0; i < headers.length; i++) {
                    rows_info.push(row[headers[i]]); //pushing region in array

                }
            }

        }
        gs.info("Shamma" + rows_info.toString());
    

var rows = rows_info.split(",");

})();
