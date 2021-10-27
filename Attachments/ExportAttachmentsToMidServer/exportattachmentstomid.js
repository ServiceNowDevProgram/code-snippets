/**********************************************************************************************/
Input
recordId - The sys_id of record whose attachments need to be exported
filePath - The relative file path where attachments be exported. All attachments will be exported into agent\export\ folder of your mid server
midServerName - Name of your mid server

Output
All attachments in the input record are exported into the relative file path specified. Eg if filePath provided is \incident\INC000234442\ , the attachments inside INC000234442 will be copied over mid server path at \agent\export\incident\INC000234442\

Note: This can also create new folders automatically

/**********************************************************************************************/

function exportAttachmentsToMid(recordId, filePath, midServerName) {
    var attachment = new GlideRecord("sys_attachment");
    if (attachment.get('table_sys_id', recordId)) {

        //Create an entry in the ecc_agent_attachment table
        var eccAttachment = new GlideRecord("ecc_agent_attachment");
        eccAttachment.newRecord();
        eccAttachment.setValue("name", "Export Attachment");
        eccAttachment.setValue("short_description", "Exporting attachment of " + recordId);
        var eccAttachmentId = eccAttachment.insert();

        //Copies all attachment from the record into the agent attachment table for export
        GlideSysAttachment.copy(attachment.getValue("table_name"), recordId, 'ecc_agent_attachment', eccAttachmentId);

        //Access all the copied attachments and copy them one by one into the mid server file path
        var copiedAttachments = new GlideRecord('sys_attachment');
        copiedAttachments.addQuery('table_name', 'ecc_agent_attachment');
        copiedAttachments.addQuery('table_sys_id', eccAttachmentId);
        copiedAttachments.query();
        while (copiedAttachments.next()) {
            // Create XML Payload for ECC
            var xmlString = '<?xml version="1.0" encoding="UTF-8"?>' +
                '<parameters>' +
                '<parameter name=\"stream_relay_response_topic\" value=\"ExportSetResult\"/>' +
                '<stream_relay_source attachment_sys_id=\"' + copiedAttachments.getUniqueValue() + '\" type=\"AttachmentSource\"/>' +
                '<stream_relay_transform attachment.table_sys_id=\"' + eccAttachmentId + '\" order=\"0\" stream_relay_transfer_progress_interval=\"150\" type=\"AttachmentProgressTransformer\"/>' +
                '<stream_relay_sink path=\"' + filePath + copiedAttachments.getValue("file_name") + '\" type=\"FileSink\"/>' +
                '</parameters>';

            // Create ECC Record
            var eccQueue = new GlideRecord('ecc_queue');
            eccQueue.newRecord();
            eccQueue.agent = 'mid.server.' + midServerName;
            eccQueue.topic = 'StreamPipeline';
            eccQueue.queue = 'output';
            eccQueue.state = 'ready';
            eccQueue.payload = xmlString;
            eccQueue.insert();
        }
    } else {
        return "No attachments";
    }
}
