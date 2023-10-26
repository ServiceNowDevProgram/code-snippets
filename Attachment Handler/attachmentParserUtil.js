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
        attachFetch.addQuery("table_sys_id", attachmentID).addCondition("<filter>");
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



attachmentParserUtil.attachmentSingleEncoder = function(attachmentID) {
	
    try {
        var gsa, binData, file_name = [],
        file_type = [],
        file_content = [];
        var attachFetch = new GlideRecord("sys_attachment");
        attachFetch.addQuery("table_sys_id", attachmentID).addCondition("<filter>");
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

