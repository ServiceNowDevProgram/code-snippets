function validateQuery(grToCheck) {
    return grToCheck.isEncodedQueryValid(grToCheck.getEncodedQuery());
}

function isNullOrEmpty(val) {

    return val == null || val == '' || val == undefined;
}

function validateArgs() {
    for (var i = 0; i < arguments.length; i++) {
        if (isNullOrEmpty(arguments[i])) {
            return false;
        }
    }
    return true;
}

function updateRecords(args) {
    var tbl = args['table'];
    var qry = args['encodedQuery'];
    var updateField = args['updateField'];
    var auditField = args['auditField'];
    var sort = args['sort'];
    
    if (!validateArgs(tbl, qry, updateField, auditField)) {
        throw new Error("UpdateRecords: Missing or invalid arguments");
    }

    var grTicket = new GlideRecord(tbl);
    grTicket.addEncodedQuery(qry);
    if (!validateQuery(grTicket)) {
        throw new Error("function requires valid encoded query");
    }
    if (!grTicket.isValid()) {
        throw new Error("Invalid table name");
    }

    grTicket.query();

    var auditVal;
    var asdf = [];

    while (grTicket.next()) {

        auditVal = getAuditValue(tbl, grTicket.getUniqueValue(), auditField,sort);

        if (!isNullOrEmpty(auditVal)) {
            asdf.push(grTicket.getValue('number') + ":" + auditVal);
            grTicket.setValue(updateField, auditVal);
            grTicket.update();
        }


    }


    return asdf;
}

function getAuditValue(tbl, sysid, field, sort) {

    sort == sort || 'ASC';
    if (isNullOrEmpty(tbl) || isNullOrEmpty(sysid) || isNullOrEmpty(field)) {
        throw new Error("all arguments are required");
    }
    var grAudit = new GlideRecord('sys_audit');
    grAudit.addQuery('documentkey', sysid);
    grAudit.addQuery('fieldname', field);
    grAudit.addNotNullQuery('newvalue');

    if (sort == 'DESC') {
        grAudit.orderByDesc('sys_created_on');
    } else {
        grAudit.orderBy('sys_created_on');
    }

    grAudit.setLimit(1)
    grAudit.query();
    if (grAudit.next()) {
        return grAudit.getValue('newvalue');

    }

    return;

}

/*  ##################################################################
############ EXAMPLE:  CHANGE THE BELOW CODE!!!!! #################
######################################################################
*/

var updateArgs = {
    encodedQuery: 'u_some_cool_field=blahblahblahL',
    table: 'my_cool_table',
    updateField: 'field to update in target table',
    auditField: 'field name in sys_audit',
    sort: 'DESC
}


try {

    gs.print(updateRecords(updateArgs).join('\n'));
} catch (ex) {
    gs.error(ex.message || ex);
}
