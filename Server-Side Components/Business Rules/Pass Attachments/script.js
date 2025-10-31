//This script copies attachments from a source record in another table to the current record (likely a case or task). It ensures that attachments are preserved when creating or linking records across tables.


(function executeRule(current, previous /*null when async*/) {

if(!current.source_record || !current.source_table) {
	gs.info('No source record found for' + current.number);
	return;
}
var sourceId= current.source_record.toString();
var sourceTable = current.source_table.toString();

gs.info('coping attachments from' + sourceTable + '[' + sourceId +'] case' + current.number);

try{
var gsa = new GlideSysAttachment();
var copiedCount = gsa.copy(sourceTable, sourceId, current.getTableName(), current.getUniqueValue());


gs.info('Attachments copied from' + copiedCount +'attachment from' + sourceTable + ' to Case' +  current.number);
}catch (e) {
	gs.error('Attachment copied from case' +current.number + ': ' + e.message);
}
})(current, previous);
