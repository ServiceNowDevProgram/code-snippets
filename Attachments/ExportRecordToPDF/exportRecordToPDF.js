/*****************************************************************************************/
INPUT:
tableName - Name of table whose record need to be exported to PDF
recordId - sys_id of the record that should be exported to PDF
fileName - Name of file after it is exported

OUTPUT:
status - HTTP status of export
200 = Successfully exported
  
Note: Create 2 system properties to store the user_name and password of a web service access user
pdf.export.user.id - user_name of the web service only access user
pdf.export.user.password - password of the user
/*****************************************************************************************/

function exportRecordToPDF(tableName, recordId, fileName) {
    var response;
    var responseBody;
    var status;
    try {
        var restMessage = new sn_ws.RESTMessageV2();
        restMessage.setHttpMethod('GET');
        var url = gs.getProperty('glide.servlet.uri') + tableName + '.do?PDF&sys_id=' + recordId;
        restMessage.setEndpoint(url);
        restMessage.setBasicAuth(gs.getProperty('pdf.export.user.id'), gs.getProperty('pdf.export.user.password'));
        restMessage.saveResponseBodyAsAttachment(tableName, recordId, fileName);
        response = restMessage.execute();
        status = response.getStatusCode();
        return status;
    } catch (ex) {
        //gs.error(ex.getMessage());
    }
}
