/*
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

Access - The user should have required access/roles to read the exported tables, and write to the record where the file will be attached

Authentication option #1 - preferred
Create a Basic Auth credential record and insert the sys_id of the Credential record in the script below
  
Authentication option #2 - less secure
Create 2 system properties to store the user_name and password of a web service access user
pdf.export.user.id - user_name of the web service only access user
pdf.export.user.password - password of the user
*/

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
  
        //Authentication option #1 - preferred
        var credentialID = "ef43c6d40a0a0b5700c77f9bf387afe3"; //SYSID of the Credential record, REPLACE VALUE FROM YOUR INSTANCE
        var provider = new sn_cc.StandardCredentialsProvider();
        var credential = provider.getCredentialByID(credentialID);
        restMessage.setBasicAuth(credential.getAttribute("user_name"), credential.getAttribute("password"));
        
        //Authentication option #2 - less secure
        //restMessage.setBasicAuth(gs.getProperty('pdf.export.user.id'), gs.getProperty('pdf.export.user.password'));
        
        restMessage.saveResponseBodyAsAttachment(tableName, recordId, fileName);
        response = restMessage.execute();
        status = response.getStatusCode();
        return status;
    } catch (ex) {
        gs.error(ex.getMessage());
    }
}
