var ritm_sys_id = '4060f68007cd30100779fea89c1ed0a2'; // Replace to your RITM sys_id
var qrText = "Test"; // Your text to convert to QR code e.g. your URL etc

var current = new GlideRecord('sc_req_item');

if (current.get(ritm_sys_id)) {

	var baseURL = "https://api.qrserver.com/v1/create-qr-code/";
	var qrData = "?data=" + qrText + "&size=100x100";

	var requestUrl = encodeURI(baseURL +  qrData);
	var request = new sn_ws.RESTMessageV2();
	request.setHttpMethod('get');
	request.setEndpoint(requestUrl);
	request.setRequestHeader("Content-Type", "image/jpeg");
	request.saveResponseBodyAsAttachment("sc_req_item", ritm_sys_id, qrText); // Save the body as attachment
	var pdfContentResponse = request.execute();

}
