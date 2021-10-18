var example_hybrid_parameters = Class.create();
example_hybrid_parameters.prototype = Object.extendsObject(
  AbstractAjaxProcessor,
  {
    /*
        This function shows how you can create a script include that can either be called from a AJAX call, or from direct object creation in a server side script.

    	@parm: {parm1} Shows if parm1 was a string of values seperated by a ","
    	@parm: {parm2} Shows directly getting the value from the parameter.
    	@parm: {parm3} Shows constructing the parameter value into a string, the one from the AJAX call will already be a string.
		@parm: {parm4} Shows an example of using a boolean value for the parameter.
    */
    exampleHybrid: function (parm1, parm2, parm3, parm4) {
      parm1 = parm1
        ? parm1.split(",")
        : this.getParameter("sysparm_parm1").split(",");
      parm2 = parm2 ? parm2 : this.getParameter("sysparm_parm2");
      parm3 = parm3 ? parm3.toString() : this.getParameter("sysparm_parm3");
      parm4 = parm4 ? parm4 : true;

      //Do other things after this
    },
    type: "example_hybrid_parameters",
  }
);
