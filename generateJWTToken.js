var jwtAPI = new sn_auth.GlideJWTAPI();
var headerJSON = {  "kid": "<key id value>"  };
var header = JSON.stringify(headerJSON);
var payloadJSON = { "iss": "<client_id value>", "sub": "ravikumar@gmail.com", "aud”:”<client_id value>”, ”exp”:”36500” };
var payload = JSON.stringify(payloadJSON);
var jwtProviderSysId = "<JWT provider sys id value>";
var jwt = jwtAPI.generateJWT(jwtProviderSysId, header, payload);
gs.info("******JWT Token:" + jwt);
