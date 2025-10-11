    // Add below code to Before BR
    var grSA = new GlideAggregate('sys_attachment');
    grSA.addAggregate('COUNT');
    grSA.addQuery('table_name', current.getTableName());
    grSA.addQuery('table_sys_id', current.sys_id);
    grSA.query();
    var attachementCount= 0;
    if (grSA.next()) {
        attachementCount = grSA.getAggregate('COUNT');
        if (attachementCount <2) {
              gs.addErrorMessage("Please attach the Approvals and Invoice details to submit the request. ");
            current.setAbortAction(true);
        }
    }
