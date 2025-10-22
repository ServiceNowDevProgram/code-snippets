var tableName = ''; //table name to export from
var fileNamePrefix = ''; //name of the file that will be exported
var rowsPerExport; //number of rows to export per file
var orderByField = 'sys_id'; //name of the field to orderby, sys_id is recommended except in rare circumstances like querying a db view table
var instanceURL = ''; //url of the instance to export from
var fileFormat = ''; //desired format of the exported file
var authenticationProfileID = ''; //sys_id of the authentication profile to use for rest calls
var authenticationProfileType = ''; //type of authentication profile, either basic or oauth
var viewName = ''; //name of the view to use for the export (controls what fields are included)
var midServerName = ''; //name of midserver to export to

var gr = new GlideRecord(tableName);
gr.setLimit(1000000);
gr.query();
var count = gr.getRowCount();
var iterations = parseInt(count/rowsPerExport) + 1;
for(var i = 0; i < iterations; i++){
  var id = getLastSysID(i * 10000);
  var eccAttachmentID = createECCAttachmentGR();
  var fileName = fileNamePrefix + i;
  var attachmentID = downloadFile(id, eccAttachmentID, fileName);
  var eccID = insertToECC(attachmentID, eccAttachmentID, fileName);
}

function getLastSysID(row){
  var gr = new GlideRecord(tableName);
  gr.orderBy(orderByField);
  gr.chooseWindow(row, row+1);
  gr.query();
  gr.next();
  return gr.getValue(orderByField);
}

function createECCAttachmentGR(){
	var eccAttachmentGR = new GlideRecord('ecc_agent_attachment');
	eccAttachmentGR.initialize();
	eccAttachmentGR.setValue('source', 'Paginated Export');
	eccAttachmentGR.setValue('name', 'Export Set Attachment');
	var eccAttachmentID = eccAttachmentGR.insert();
	return eccAttachmentID;
}

function downloadFile(id, eccAttachmentID, fileName){
 var request = new sn_ws.RESTMessageV2();
request.setAuthenticationProfile(authenticationProfileType, authenticationProfileID);
  request.setEndpoint(instanceURL + '/' + tableName + '_list.do?' + fileFormat.toUpperCase() + '&sysparm_view=' + viewName + '&sysparm_query=' + orderByField + '%3E%3D' + id + '&sysparm_orderby=' + orderByField + '&sysparm_record_count=' + rowsPerExport);
  request.setHttpMethod('GET');
  request.saveResponseBodyAsAttachment('ecc_agent_attachment', eccAttachmentID, fileName + '.' + fileFormat);
  var response = request.execute(); 
  var attachmentID = response.getResponseAttachmentSysid();
  return attachmentID;
}

function insertToECC(attachmentID, recordID, fileName){
	var xmlString = getXMLString(attachmentID, recordID, fileName);
	var eccGR = new GlideRecord('ecc_queue');
	eccGR.initialize();
	eccGR.setValue('agent', midServerName);
	eccGR.setValue('topic', 'StreamPipeline');
	eccGR.setValue('queue', 'output');
	eccGR.setValue('payload', xmlString);
	eccGR.insert();
}

function getXMLString(attachmentID, recordID, fileName){
    fileName += '.' + fileFormat;
	var xmlString = 
	'<?xml version="1.0" encoding="UTF-8"?>' + 
	'<parameters>' +
		'<parameter name=\"stream_relay_response_topic\" value=\"ExportSetResult\"/>' +
		'<stream_relay_source attachment_sys_id=\"' + attachmentID + '\" type=\"AttachmentSource\"/>' +
		'<stream_relay_transform attachment.table_sys_id=\"' + recordID + '\" order=\"0\" stream_relay_transfer_progress_interval=\"150\" type=\"AttachmentProgressTransformer\"/>' +
		'<stream_relay_sink path="\/' + fileName + '\" type=\"FileSink\"/>' +
		'</parameters>';
	return xmlString;
}

