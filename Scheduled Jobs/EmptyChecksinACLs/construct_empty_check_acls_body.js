(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {
    var aclGr = new GlideRecord("sys_security_acl");
    aclGr.addEncodedQuery("conditionISEMPTY^scriptISEMPTY^type=record");
    aclGr.query();

	var body = "<ul>";
    while (aclGr.next()) {
        var aclRoleGr = new GlideRecord("sys_security_acl_role");
        if (!aclRoleGr.get("sys_security_acl", aclGr.getUniqueValue())) {
            gs.print(aclGr.name + " : " + aclGr.sys_id);
			body += "<li>" + aclGr.name + " - " + aclGr.sys_id + "</li>";
        }
    }
	body = body + "</ul>";
	template.print(body);
	
})(current, template, email, email_action, event);