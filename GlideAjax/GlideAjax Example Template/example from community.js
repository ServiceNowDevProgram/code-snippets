// From https://community.servicenow.com/community?id=community_article&sys_id=9f7ce2e1dbd0dbc01dcaf3231f96196e
// Client Side (Client Script):
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
    var ga = new GlideAjax('asu_GetLocationData');
    ga.addParam('sysparm_name', 'getCampus');
    ga.addParam('sysparm_buildingid', g_form.getValue("u_building"));
    ga.getXML(updateCampus);
}

function updateCampus(response) {
    var answer = response.responseXML.documentElement.getAttribute("answer");
    var clearvalue; // Stays Undefined
    if (answer) {
        var returneddata = JSON.parse(answer);
        g_form.setValue("campus", returneddata.sys_id, returneddata.name);
    } else {
        g_form.setValue("campus", clearvalue);
    }
}

// Server Side (Script Include):
var asu_GetLocationData = Class.create();
asu_GetLocationData.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getCampus: function() {
        var buildingid = this.getParameter('sysparm_buildingid');
        var loc = new GlideRecord('cmn_location');
        if (loc.get(buildingid)) {
            var campus = new GlideRecord('cmn_location');
            if (campus.get(loc.parent)) {
                var json = new JSON();
                var results = {
                    "sys_id": campus.getValue("sys_id"),
                    "name": campus.getValue("name")
                };
                return JSON.stringify(results);
            }
        } else {
            return null;
        }
    }
});
