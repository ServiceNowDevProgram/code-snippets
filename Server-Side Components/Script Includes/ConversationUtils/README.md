# Script Include: ConversationUtils

A simple script include to create a Connect Chat conversation with a single user and send messages to the conversation.

## Example usage

```
var conversation = new ConversationUtils(gs.getUserID(), "Example Conversation");
conversation.sendMessage("Hello World");
```