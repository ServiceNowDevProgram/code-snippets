(function execute(inputs, outputs) {
// ... code ...



var arr = [];
 
var gratt = new GlideRecord('sys_attachment');
gratt.addQuery('sys_id', inputs.attachment_id);
gratt.addEncodedQuery('table_name=sc_req_item'); //checking the sys_id of the attachment
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
 
    //var rowData = [];
    // Iterate over each row in the worksheet
    while (parser.next()) {
        row = parser.getRow();
        gs.info("Shamma row" + row[headers[3]].toString());
        var dispute_num = row[headers[0]].toString();
        //rowData.push(row);
        //gs.info("Shamma " + rowData.toString());
        if(row[headers[0]].toString()!= "")
        {
        var disp = new GlideRecord("x_66357_motherho_0_dispute_requests");
        disp.addQuery('dispute_number', dispute_num);
        disp.query();
        if(disp.next())
        {
       
        disp.dispute_number = row[headers[0]].toString();
        disp.dispute_account = row[headers[1]].toString();
        disp.dispute_type = row[headers[2]].toString();
        disp.dispute_notes = row[headers[3]].toString();
        disp.dispute_amount = row[headers[4]].toString(); 
        disp.update(); 
        }
        else{
var dispute = new GlideRecord("x_66357_motherho_0_dispute_requests");
        dispute.initialize();
        dispute.dispute_number = row[headers[0]].toString();
        dispute.dispute_account = row[headers[1]].toString();
        dispute.dispute_type = row[headers[2]].toString();
        dispute.dispute_notes = row[headers[3]].toString();
        dispute.dispute_amount = row[headers[4]].toString();
        dispute.insert();
        }
        
        
 
        }
        }
 
    }

 

 
})(inputs, outputs);
