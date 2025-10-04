var callerID = g_form.getValue("caller_id");
var url = "incident_list.do?sysparm_query=active=true^caller_id=" + callerID;
g_navigation.open(url, "_blank");
