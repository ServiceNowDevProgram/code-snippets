var ashParser;
    var attachMetaData = attachmentParserUtil.attachmentHandler(source.u_attachment);

    try {
        /*
        This checks if Attachment attribute ends with ']' then it is multi attachment else single attachment which requires parsing directly
        */
        if (source.u_attachment.endsWith("]")) {

            for (var ash in attachMetaData) {

                ashParser = JSON.parse(attachMetaData[ash]);

                attachmentParserUtil.attachmentDecoder(target, ashParser["file_name"], ashParser["file_type"], ashParser["file_content"]);

            }


        } else {
/*
        This checks if Attachment attribute ends with '}' then it is single attachment 
*/
            ashParser = JSON.parse(attachMetaData);

            attachmentParserUtil.attachmentDecoder(target, ashParser["file_name"], ashParser["file_type"], ashParser["file_content"]);

        }
    } catch (e) {
        log.error(e);
    }
