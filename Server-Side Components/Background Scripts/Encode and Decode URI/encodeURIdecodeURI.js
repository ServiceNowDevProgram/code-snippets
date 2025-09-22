var getURI = 'https://api.dynatrace.com/v2/query=min:tls.get_days{*}by{name,script}';
var encoded = encodeURI(getURI);
gs.info(encoded);
// Expected output: "https://api.dynatrace.com/v2/query=min:tls.get_days%7B*%7Dby%7Bname,script%7D"

var decoded = decodeURI(encoded);
gs.info(decoded);
// Expected output: "https://api.dynatrace.com/v2/query=min:tls.get_days{*}by{name,script}"
