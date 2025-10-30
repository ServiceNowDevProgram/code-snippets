var DocumentValidationHelper = Class.create();
DocumentValidationHelper.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  validateAttachments: function() {
    var itemId = this.getParameter('sysparm_item_id');
    var attachmentGR = new GlideRecord('sys_attachment');
    attachmentGR.addQuery('table_name', 'sc_req_item');
    attachmentGR.addQuery('table_sys_id', itemId);
    attachmentGR.query();

    while (attachmentGR.next()) {
      var fileName = attachmentGR.file_name.toLowerCase();
      if (!fileName.endsWith('.pdf') && !fileName.endsWith('.docx')) {
        return 'Only PDF or DOCX files are allowed.';
      }
      if (attachmentGR.size_bytes > 5 * 1024 * 1024) {
        return 'File size exceeds 5MB limit.';
      }
    }

    return 'valid';
  }
});
