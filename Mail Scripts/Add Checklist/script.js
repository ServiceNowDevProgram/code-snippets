(function runMailScript(current, template, email, email_action, event) {

    var grTable = current.getValue('sys_class_name');
    var grSysId = current.getValue('sys_id');
    var grChecklist = new GlideRecord("checklist");
    grChecklist.addQuery("table", grTable);
    grChecklist.addQuery("document", grSysId);
    grChecklist.query();
    if (grChecklist.next()) {
        var grChecklistItem = new GlideRecord("checklist_item");
        grChecklistItem.addQuery("checklist", grChecklist.getValue("sys_id"));
        grChecklistItem.orderBy("order");
        grChecklistItem.query();
        if (grChecklistItem.hasNext()) {
            template.print("<strong>Checklist:</strong>");
            while (grChecklistItem.next()) {
                var checked = "";
                if (grChecklistItem.getValue("complete") == "1") {
                    checked = "checked";
                }
                template.print("<br/>");
                template.print(gs.getMessage("<input type='checkbox' {0} disabled />", [checked]));
                template.print("&nbsp;");
                template.print(grChecklistItem.getValue("name"));
            }
        }
    }

})(current, template, email, email_action, event);
