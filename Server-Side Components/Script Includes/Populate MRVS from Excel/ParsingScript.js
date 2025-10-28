parseExcel: function() {
    var attachSysId = this.getParameter('sysparm_id');
    var attachment = new GlideSysAttachment();
    var parser = new sn_impex.GlideExcelParser();
    var mrvsArray = [];
    // get content of the attachment
    var content = attachment.getContentStream(attachSysId);
    parser.parse(content);
    // Iterate through each row after header. Return false if row doesn't exist
    while (parser.next()) {
        // get content of the row
        var row = parser.getRow();
        //push the object with key same as variable name in the MRVS.
        var obj = {};
        obj.employee_id = row['Id'];
        obj.employee_name = row['Name'];
        mrvsArray.push(obj);
    }
    return JSON.stringify(mrvsArray);
},
