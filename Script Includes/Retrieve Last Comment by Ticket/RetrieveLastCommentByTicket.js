var RetrieveLastCommentByTicket = Class.create();
RetrieveLastCommentByTicket.prototype = {
    initialize: function() {},
	
    retrieveLastCommentByTicket: function(sysId, tableName) {
        var lastComment = new GlideRecord('sys_journal_field');

        lastComment.addQuery('name', tableName);
        lastComment.addQuery('element_id', sysId);
        lastComment.addQuery('element', 'comments');
        lastComment.orderByDesc('sys_created_on');
        lastComment.setLimit(1);
        lastComment.query();

        if (lastComment.next())
            return lastComment;

        return null;
    },

    type: 'RetrieveLastCommentByTicket'
};