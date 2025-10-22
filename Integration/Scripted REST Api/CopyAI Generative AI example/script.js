var prompt = 'hello there!';
var show_tokens = false;
var chatReq = new sn_ws.RESTMessageV2();
chatReq.setEndpoint('https://api.openai.com/v1/chat/completions');
chatReq.setHttpMethod("POST");
chatReq.setRequestHeader("Authorization", "Bearer " + gs.getProperty("openai.key"));
chatReq.setRequestHeader('Content-Type', "application/json");
chatReq.setRequestHeader('User-Agent', "ServiceNow");
chatReq.setRequestHeader("Accept", "*/*");
var body = {
  "model": "gpt-3.5-turbo",
  "messages": [{"role": "user", "content": prompt}],
//  "max_tokens": 250
};
chatReq.setRequestBody(JSON.stringify(body));
var chatResponse = chatReq.execute();
gs.info(chatResponse.getBody());
var chatResponseBody = JSON.parse(chatResponse.getBody());

var token_cost = show_tokens ? "> tokens: " + chatResponseBody.usage.total_tokens + " ($" + (parseInt(chatResponseBody.usage.total_tokens) * 0.000002).toFixed(6) + ")\n" : "";
var response = token_cost + chatResponseBody.choices[0].message.content;

gs.info(response);