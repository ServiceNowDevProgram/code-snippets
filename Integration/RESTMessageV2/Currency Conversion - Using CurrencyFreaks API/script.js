var symbols ="INR,EUR,KWD,SAR"; //Enter symbol name like SAR,AED
var apiKey =""; // Paste your CurrencyFreaks APIKEY here
getExchangeReate(apiKey, symbols);

function getExchangeReate(apiKey,symbols){
	try { 
	
 var r = new sn_ws.RESTMessageV2('ExchangeRate API', 'Default GET');
 r.setStringParameterNoEscape('symbols', symbols);
 r.setStringParameterNoEscape('apikey', apiKey);


 var response = r.execute();
 var responseBody = response.getBody();
 var httpStatus = response.getStatusCode();
 gs.print("Status: " +httpStatus);
 gs.print("Result:" +responseBody); //It will show conversion from USD the selected currency 
}
catch(ex) {
 var message = ex.message;
}
}
