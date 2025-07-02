var TestScriptInclude = Class.create();
TestScriptInclude.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getLogs: function() {
        var query = this.getParameter("sysparm_query");
        var initialFetch = this.getParameter("sysparm_initialFetch");
        var startTime = this.getParameter("sysparm_startTime");
        var response = [];
        if (initialFetch == "true") {
            startTime = new GlideDateTime().getDisplayValue().toString();
        }
		var date = startTime.split(" ")[0];
		var time = startTime.split(" ")[1];
        var grLog = new GlideRecord("syslog");
        grLog.addEncodedQuery(query);
        grLog.addEncodedQuery("sys_created_on>=javascript:gs.dateGenerate('" + date.split("-").reverse().join("-") + "','" + time + "')");
        grLog.orderByDesc("sys_created_on");
        grLog.query();
        while (grLog.next()) {
            response.push({
                "message": grLog.message.toString(),
                "sys_created_on": grLog.sys_created_on.getDisplayValue()
            });
        }
		
        return JSON.stringify({
            "startTime": startTime,
            "response": response
        });
    },

    type: 'TestScriptInclude'
});