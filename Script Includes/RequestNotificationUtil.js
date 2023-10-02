var RequestNotificationUtil = Class.create();
RequestNotificationUtil.prototype = Object.extendsObject(RequestNotificationUtilSNC, {
    initialize: function() {
        RequestNotificationUtilSNC.prototype.initialize.apply(this, arguments);
    },

	/**
     * Get Reject comment from RITM - found that rejection notes added in EC will post
	 * to RITM record rather than Approval record
     * @param requestId - requestId
     * @returns comment based on the state for last rejected
     */
    getRejectCommentRITM: function(requestId) {
        var ritmRecord = new GlideRecord("sc_req_item");
        ritmRecord.addQuery('request', requestId);
        ritmRecord.orderBy('sys_updated_on');
        ritmRecord.setLimit(1);
        ritmRecord.query();
        while (ritmRecord.next()) {
            var commentDesc = ritmRecord.comments.getJournalEntry(1).toString();
            if (commentDesc.length > 0 && commentDesc.indexOf("Reason for rejection:") > -1) {
                var split = commentDesc.split(/\(Additional comments\)/gi);
                if (split.length > 1) {
                    // returns the first comment.
                    var comment = split[split.length - 1];
                    comment = comment.trim();
                    var colonIndex = comment.indexOf(':');
                    if (colonIndex != -1) {
                        comment = comment.substr(colonIndex + 2, comment.length - 1);
                    }
                    comment = comment.replace(/\n/g, '<br/>');
                    return comment;
                }
            }
        }
    },

    type: 'RequestNotificationUtil'
});
