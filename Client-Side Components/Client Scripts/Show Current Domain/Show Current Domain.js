function onLoad() {
	var ga = new GlideAjax('DomainCheckUtil');
    ga.addParam('sysparm_name', 'getCurrentDomainName');
    ga.getXMLAnswer(showDomainMessage);
    function showDomainMessage(response) {
		var message = 'You are currently working in Domain Separation domain: <strong>' + response + '</strong>.';
		g_form.addInfoMessage(message);
    }
}
