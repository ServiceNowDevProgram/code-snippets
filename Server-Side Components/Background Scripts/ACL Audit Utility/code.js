
    // Description: Audits ACLs for potential misconfigurations and logs findings.

    var grACL = new GlideRecord('sys_security_acl');
    grACL.query();

    while (grACL.next()) {
        var aclName = grACL.name.toString();
        var type = grACL.type.toString();
        var operation = grACL.operation.toString();
        var active = grACL.active;

        // Check for ACLs that are inactive
        if (!active) {
            gs.info('[ACL Audit] Inactive ACL found: ' + aclName + ' | Operation: ' + operation);
            continue;
        }

        // Check for ACLs with no condition or script
        var hasCondition = grACL.condition && grACL.condition.toString().trim() !== '';
        var hasScript = grACL.script && grACL.script.toString().trim() !== '';

        if (!hasCondition && !hasScript) {
            gs.warning('[ACL Audit] ACL with no condition or script: ' + aclName + ' | Operation: ' + operation);
        }

        // Check for ACLs granting 'read' access to 'public'
        if (operation === 'read' && grACL.roles.toString() === '') {
            gs.warning('[ACL Audit] Public read access detected: ' + aclName);
        }
    }
