function onLoad() {

    var ga = new GlideAjax("TestScriptInclude");
    ga.addParam("sysparm_name", "getCalculations");
    ga.addParam("sysparm_input1", 50);
    ga.addParam("sysparm_input2", 10);
    ga.getXML(function(response) {
		var ele = response.responseXML.documentElement;

		var add = ele.getAttribute("add");
		var sub = ele.getAttribute("sub");
		var mul = ele.getAttribute("mul");
		var div = ele.getAttribute("div");

		var message = "";
		message = message + "Addition: " + add + "\n";
		message = message + "Subtraction: " + sub + "\n";
		message = message + "Multiplication: " + mul + "\n";
		message = message + "Subtraction: " + div + "\n";

		g_form.addInfoMessage(message);
    });

}