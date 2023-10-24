var TestScriptInclude = Class.create();
TestScriptInclude.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	getCalculations: function(){
		var input1 = Number(this.getParameter("sysparm_input1"));
		var input2 = Number(this.getParameter("sysparm_input2"));

		var add = input1 + input2;
		this.getRootElement().setAttribute('add', add);

		var sub = input1 - input2;
		this.getRootElement().setAttribute('sub', sub);

		var mul = input1 * input2;
		this.getRootElement().setAttribute('mul', mul);

		var div = input1 / input2;
		this.getRootElement().setAttribute('div', div);
	},

    type: 'TestScriptInclude'
});