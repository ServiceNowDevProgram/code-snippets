/*****************************************************************************************/
INPUT:
tableName - Name of table whose records need to be exported
recordId - sys_id of the record where the exported attachment should be uploaded
recordQuery - encoded query to access the required records. For PDF files, you should only pass sys_id eg: sys_id=b3f076504750210042bd757f2ede273f
recordView - Specify the required view, Pass empty string for default view eg: ess, portal,
dataType - The required export format - Supported formats eg CSV, XLS, EXCEL, XLSX, PDF, JSONv2, XML, XSD, SCHEMA, RSS 
fileName - Name of exported file along with its extension eg fileName.csv, fileName.json

OUTPUT:
status - HTTP status of export
200 = Successfully exported
  
Note: Create 2 system properties to store the user_name and password of a web service access user
pdf.export.user.id - user_name of the web service only access user
pdf.export.user.password - password of the user
The user should have required access to read the exported tables
/*****************************************************************************************/

function exportRecords(tableName, recordId, recordQuery, recordView, dataType, fileName) {
    var response;
    var status;
    var url;
    try {
        var restMessage = new sn_ws.RESTMessageV2();
        restMessage.setHttpMethod('GET');
        if(dataType == "PDF"){
            //For PDF, sys_id should be passed as it accepts only a single record
            url = gs.getProperty('glide.servlet.uri') + tableName + '.do?'+ dataType + '&' + recordQuery + '&sysparm_view='+recordView;
        }else{
            url = gs.getProperty('glide.servlet.uri') + tableName + '.do?'+ dataType + '&sysparm_query=' + recordQuery + '&sysparm_view='+recordView;
        }
        restMessage.setEndpoint(url);
        restMessage.setBasicAuth(gs.getProperty('pdf.export.user.id'), gs.getProperty('pdf.export.user.password'));
        restMessage.saveResponseBodyAsAttachment(tableName, recordId, fileName);
        response = restMessage.execute();
        status = response.getStatusCode();
        return status;
    } catch (ex) {
        gs.error(ex.getMessage());
    }
}
