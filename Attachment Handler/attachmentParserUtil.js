var attachmentParserUtil = Class.create();

attachmentParserUtil.attachmentDecoder = function(target, filename, filetype, attachment_base64) {

    var attachment = new GlideSysAttachment();

    var decodedBytes = GlideStringUtil.base64DecodeAsBytes(attachment_base64);

    var id = attachment.write(target, filename, filetype, decodedBytes);
    return;

};

attachmentParserUtil.attachmentEncoder = function(attachmentID) {
	
    try {
        var gsa, binData, file_name = [],
        file_type = [],
        file_content = [];
        var attachFetch = new GlideRecord("sys_attachment");
        attachFetch.addQuery("table_sys_id", attachmentID).addCondition("sys_created_by","!=","hrsd_snow");
        attachFetch.query();
        while (attachFetch.next()) {

            file_name.push(attachFetch.file_name.toString());
            file_type.push(attachFetch.content_type.toString());
            gsa = new GlideSysAttachment();
            binData = gsa.getBytes(attachFetch);
            file_content.push(GlideStringUtil.base64Encode(binData));
        }

return JSON.stringify({
            'file_name': file_name,
            'file_content': file_content,
            'file_type': file_type
});
		
// return GlideStringUtil.base64Encode(binData);
		
    } catch (error) {

        gs.error(error);
    }


};

attachmentParserUtil.attachmentHandler = function(attachment) {

    if (attachment.endsWith("]")) {

        return attachmentParserUtil.attachmentMultiAttachment(attachment);
    } else if (attachment.endsWith("}")) {

        return attachmentParserUtil.attachmentSingleAttachment(attachment);

    }
};

attachmentParserUtil.attachmentSingleAttachment = function(attachment) {

    var attachDetails = {};

    var bracketRemove = attachment.lastIndexOf("}");

    var attachmentNew = attachment.slice(1, bracketRemove);

    attachmentNew = attachmentNew.split(",");

    for (var attach in attachmentNew) {

        attachDetails[attachmentNew[attach].split("=")[0].trim()] = attachmentNew[attach].split("=")[1].toString();
        if (attachmentNew[attach].split("=")[0].trim() == "file_content") {

            attachDetails[attachmentNew[attach].split("=")[0].trim("")] = attachmentNew[attach].substr(attachmentNew[attach].indexOf("=") + 1);
        }

    }
    return JSON.stringify(attachDetails, null, 3);

};

attachmentParserUtil.attachmentMultiAttachment = function(attachment) {
    var attachmentArray = [],
        finalArray = [];
    var attachDetails = {};

    var bracketRemove = attachment.lastIndexOf("]");

    var attachmentNew = attachment.slice(1, bracketRemove);

    attachmentNew = attachmentNew.split("},");


    for (var outerLoop in attachmentNew) {

        var outerArray = attachmentNew[outerLoop].trim();

        outerArray = outerArray.slice(1).split(",");



        for (var x in outerArray) {

            attachDetails[outerArray[x].split("=")[0].trim()] = outerArray[x].split("=")[1];
            if (outerArray[x].split("=")[0].trim() == "file_content") {
				
                if (outerArray[x].substr(outerArray[x].indexOf("=") + 1).endsWith("}")) {

                    var cont = outerArray[x].substr(outerArray[x].indexOf("=") + 1);

						cont = cont.substr(0, cont.length - 1);
					
                    attachDetails[outerArray[x].split("=")[0].trim("")] = cont;
                }
            }

        }

      attachmentArray.push(JSON.stringify(attachDetails, null, 4));
    }

    return attachmentArray;

};

attachmentParserUtil.passAttachmentREST=function(incident){
var payload = {};
var inc = new GlideRecord("incident");
inc.addQuery("sys_id", incident).addCondition("cmdb_ci", gs.getProperty("ea_it_enterprise_ServiceNow_CI")).addCondition("correlation_id", "!=", "");
inc.query();
if (inc.next())

payload["u_correlation_display"] = inc.correlation_display.toString();
payload["u_correlation_id"] = inc.correlation_id.toString();
payload["u_subject_person"] = inc.caller_id.email.toString();
//payload["u_work_notes"] = "New attachment added from ITSM incident `#"+inc.number.toString() +"`";
var attachParser = JSON.parse(attachmentParserUtil.attachmentSingleEncoder(inc.getUniqueValue()));

payload.u_file_name = attachParser.file_name.toString();
payload.u_file_type = attachParser.file_type.toString();
payload.u_file_content = attachParser.file_content.toString();

try {
	// gs.info("Aashish flow output "+ JSON.stringify(payload,null,4));
    var inputs = {};
    inputs['payload_details'] = JSON.stringify(payload, null, 4); // JSON 

  
    var result = sn_fd.FlowAPI.getRunner().action('global.ea_it_incident_update').inForeground().withInputs(inputs).run();
    var outputs = result.getOutputs();
 
// gs.info("Aashish flow output "+ JSON.stringify(outputs));
        } catch (ex) {
            var message = ex.getMessage();
            gs.error(message);
        } 
	
};

attachmentParserUtil.attachmentSingleEncoder = function(attachmentID) {
	
    try {
        var gsa, binData, file_name = [],
        file_type = [],
        file_content = [];
        var attachFetch = new GlideRecord("sys_attachment");
        attachFetch.addQuery("table_sys_id", attachmentID).addCondition("sys_created_by","!=","hrsd_snow");
		attachFetch.orderByDesc('sys_created_on');
		attachFetch.setLimit(1);
        attachFetch.query();
        while (attachFetch.next()) {

            file_name.push(attachFetch.file_name.toString());
            file_type.push(attachFetch.content_type.toString());
            gsa = new GlideSysAttachment();
            binData = gsa.getBytes(attachFetch);
            file_content.push(GlideStringUtil.base64Encode(binData));
        }

return JSON.stringify({
            'file_name': file_name,
            'file_content': file_content,
            'file_type': file_type
});
} catch (error) {

        gs.error(error);
    }


};
attachmentParserUtil.validateCaller=function(caller){
	var val=false;
	var inc = new GlideRecord("sys_user");
inc.addEncodedQuery("active=true^emailLIKE"+caller.toString());
inc.query();
if (inc.next()) {
   val=true;
	
}
return val;
	
	
};
