gs.info("Current User: " + gs.getUserName())

var me = gs.getUserID();

var ableTuter = "62826bf03710200044e0bfc8bcbe5df1" //user id of the user to be impersonated.

gs.getSession().impersonate(ableTuter);

gs.info("Current User: " + gs.getUserName())

var incGr = new GlideRecord('incident');
incGr.initialize();
incGr.short_description = "Creating an incident using script impersonation";
incGr.caller = gs.getUserID();
incGr.insert();

gs.getSession().impersonate(me);