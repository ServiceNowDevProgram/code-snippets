// Script Include: QuarantineAttachmentUtils
// Purpose: Utilities for quarantining attachments.
// Scope: global or scoped. Client callable false.

var QuarantineAttachmentUtils = Class.create();
QuarantineAttachmentUtils.prototype = {
  initialize: function() {},

  ensureQuarantineRecord: function(table, fileName, reason, groupSysId) {
    var gr = new GlideRecord(table);
    gr.initialize();
    if (gr.isValidField('short_description'))
      gr.short_description = 'Quarantined attachment: ' + fileName;
    if (gr.isValidField('description'))
      gr.description = 'Reason: ' + reason;
    if (groupSysId && gr.isValidField('assignment_group'))
      gr.assignment_group = groupSysId;
    return gr.insert();
  },

  copyAndDelete: function(fromTable, fromSysId, toTable, toSysId, attachSysId) {
    var gsa = new GlideSysAttachment();
    gsa.copy(fromTable, fromSysId, toTable, toSysId, attachSysId);
    gsa.deleteAttachment(attachSysId);
  },

  getExt: function(fileName) {
    var m = String(fileName || '').match(/\.([A-Za-z0-9]+)$/);
    return m ? m[1].toLowerCase() : '';
  },

  type: 'QuarantineAttachmentUtils'
};
