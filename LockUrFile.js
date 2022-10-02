/* This script contains two parts */

/* First Part -> On Load Client Script(Written on Widget table) */

function onLoad() {
	var getId = g_form.getUniqueValue();
    var ga = new GlideAjax('PassSysId');
    ga.addParam('sysparm_name', 'SetID');
    ga.addParam('sysparm_user_name', getId);
    ga.getXML(HelloWorldParse);

    function HelloWorldParse(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");
        if (answer == '1') {
			g_form.addErrorMessage("Co-Developer is working on this widget... so please don't touch it ");
	g_form.setDisplay('css', false);
			g_form.setDisplay('template',false);
            var fields = g_form.getEditableFields();
            for (var x = 0; x < fields.length; x++) {
                g_form.setDisplay(fields[x], false);
            }
        }
    }
}

/* Second Part -> Script Include */

var PassSysId = Class.create();
PassSysId.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    SetID: function() {
        var set = 0;
        var userName = this.getParameter("sysparm_user_name");
        var findVersion = new GlideRecord('sys_update_version');
        findVersion.addEncodedQuery('nameLIKEsp_widget^nameLIKE' + userName);
        findVersion.orderByDesc('sys_created_on');
        findVersion.query();
        if (findVersion.next()) {
            var set = 1;
            gs.log("Raghu Yeddu Yeddu " + set);
            var getSource = findVersion.source;
            var gr = new GlideRecord('sys_update_set');
            gr.addQuery('sys_id', getSource);
            gr.query();
            if (gr.next()) {
                if (gr.state == "in progress") {
                    if (gs.getUserName() == findVersion.sys_created_by) {
                        var set = 123;
                    }
                } else if (gr.state == "complete") {
                    var set = 246;
                }
            }
        }
        return set;
    },
    type: 'PassSysId'
});
