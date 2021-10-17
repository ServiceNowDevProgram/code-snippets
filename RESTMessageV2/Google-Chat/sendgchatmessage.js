//Link to know how we can get Google chat webhook URL - https://developers.google.com/chat/how-tos/webhooks
// gchat_webhook_api defined below is sample one.
var gchat_webhook_api = "https://chat.googleapis.com/v1/spaces/AAAAB3/messages?key=AIzahuySyDdI0hCZtEySjMm-WEfRq3CPzqKqcghnHI&token=c2uhYt6VxQohfckyoG9G6XMBIEMczuxFu";
var message = "My message to send in google chat";

sendGChatMessage(gchat_webhook_api, message);

function sendGChatMessage(gchat_webhook_api, message) {

    var http_timeout = 10000;
    var message_tosend = {};
    message_tosend.text = message;

    //Get RESTMessageV2 object
    var request = new sn_ws.RESTMessageV2();

    //Set Request Method to POST
    request.setHttpMethod("POST");

    //Set Google chat webhook end point
    request.setEndpoint(gchat_webhook_api);

    //Set the message to send as JSON in the request body
    request.setRequestBody(JSON.stringify(message_tosend));

    //set the request timeout
    request.setHttpTimeout(http_timeout);

    //Post the message to google chat webhook
    var response = request.execute();

    if (response.getErrorCode() != 0) {
        //If any error, it will print the error message code and message.
        gs.print("Message FAILED to send : Response code : " + response.getErrorCode() + " | ERROR : " + response.getErrorMessage());
    } else {
        //If message sent successfully, it will print the reqponse message received.
        gs.print("Message sent - Response " + response.getBody());
    }
}
