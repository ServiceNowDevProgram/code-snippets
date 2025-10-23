function getLink() {
    var recordToLinkUtil = new RecordToHTML("YOUR_TABLE_NAME", "RECORD_SYS_ID",
        "CUSTOM_TEXT_TO_ADD_BEFORE_LINK: ${number}-${short_description}", true); 
        return recordToLinkUtil.toString();
}


