var jwtAPI = new sn_auth.GlideJWTAPI(); // Instantiate the object
var headerJSON = {  "kid": "<key id value>"  }; //Add the header
var header = JSON.stringify(headerJSON);
var payloadJSON = { "iss": "<client_id value>", "sub": "ravikumar@gmail.com", "aud":"<client_id value>", "exp":"36500" }; //Prepare the payload
var payload = JSON.stringify(payloadJSON);
var jwtProviderSysId = "<JWT provider sys id value>"; //Mention the JWT provider instance id
var jwt = jwtAPI.generateJWT(jwtProviderSysId, header, payload); //Now generate the JWT token
gs.info("******JWT Token:" + jwt);
