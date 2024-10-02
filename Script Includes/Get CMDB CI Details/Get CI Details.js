var GetCI_Details = Class.create();
GetCI_Details.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getCI: function() {
        var CI = this.getParameter("sysparm_cmdb_ci");
        var cmdb = new GlideRecord("cmdb_ci");
        cmdb.addQuery("sys_id", CI);
        cmdb.query();
        if (cmdb.next()) {
            return "Name: " + cmdb.name + '\n'+"Asset Tag: "+ cmdb.asset_tag + "\n"+ "Serial Number: "+ cmdb.serial_number + "\n"+ "Company: "+ cmdb.company;
        }
    },
    type: 'GetCI_Details'
});
