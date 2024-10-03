// Scheduled Script: Cleanup Old Attachments
(function execute() {
    var attachmentGR = new GlideRecord('sys_attachment');
    attachmentGR.addEncodedQuery('sys_created_on<=javascript:gs.daysAgo(90)');
    attachmentGR.query();
    
    while (attachmentGR.next()) {
        attachmentGR.deleteRecord();
    }
})(current);
