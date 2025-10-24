var ConversationUtils = Class.create();
ConversationUtils.prototype = {

    // Initialize by creating a new conversation
    initialize: function(userId, subject) {
        this.conversationId = this.createConversation(userId, subject);
		
    },

    // Create a new conversation with a user
    // Returns sys_id of the new conversation
    createConversation: function(userId, subject) {

        // 1. Create the conversation
        var conversation = sn_connect.Conversation.create({
            name: subject,
            type: "connect"
        });

        // 2. Add the provided user to the conversation as a subscriber
        conversation.addSubscriber(userId);

        // 3. Get the new conversation's Sys ID and return it
        return this._getConversation(subject);
    },

    // Send a message to a conversation
    sendMessage: function(body) {

        // 1. Get the conversation by provided Sys ID
        var conversation = sn_connect.Conversation.get(this.conversationId);

        // 2. Send the message
        conversation.sendMessage({
            body: body
        });
		
    },

    // Since the Conversation API does not provide a GlideRecord object or Sys ID,
    // look up the most recently created conversation by subject and return the Sys ID
    _getConversation: function(subject) {
        var conversationId;
        var grConvo = new GlideRecord('live_group_profile');
        grConvo.addQuery('name', 'CONTAINS', subject);
        grConvo.orderByDesc('sys_created_on');
        grConvo.query();

        if (grConvo.next()) {
            conversationId = grConvo.getValue('sys_id');
        }

        return conversationId;
    },

    type: 'ConversationUtils'
};