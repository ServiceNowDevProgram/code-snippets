var gemini_pro = Class.create();
gemini_pro.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    demoTest: function() {
        var output;
		try {
            var r = new sn_ws.RESTMessageV2('Gemini Pro model', 'gemini pro');
            r.setStringParameterNoEscape('text', this.getParameter('sysparm_text')); // To get the value of entered text.
            var response = r.execute();
            var responseBody = response.getBody();
            var httpStatus = response.getStatusCode();
			output = responseBody;
        }
        catch (ex) {
            var message = ex.message;
        }
        return output;
    },

    type: 'gemini_pro'
});
