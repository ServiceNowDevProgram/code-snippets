/*Scenario :
Whenever a record (like an HR Case, Request Item, or Change) is created, the script:
Looks up the right approvers based on dynamic rules (department, amount, category, etc.)
Automatically creates approvals in the sysapproval_approver table.*/

/* Business Rule :

Table: sc_request or proc_po_request or  custom table
When: After Insert
Condition: Only when approval is required */

(function executeRule(current, previous /*null when async*/) {

    try {
        var dept = current.u_department.name + '';
        var amount = parseFloat(current.u_amount + '');
        if (!dept || isNaN(amount)) {
            gs.info('Approval Matrix: Missing department or amount');
            return;
        }

        // Query approval matrix for matching rule
        var matrix = new GlideRecord('u_approval_matrix');
        matrix.addQuery('u_department.name', dept);
        matrix.addQuery('u_min_amount', '<=', amount);
        matrix.addQuery('u_max_amount', '>=', amount);
        matrix.query();

        if (!matrix.hasNext()) {
            gs.info('Approval Matrix: No matching rule found for ' + dept + ', amount: ' + amount);
            return;
        }

        while (matrix.next()) {
            var approverUser = '';
            
            // Option 1: Approver directly specified
            if (!gs.nil(matrix.u_approver)) {
                approverUser = matrix.u_approver;
            }
            // Option 2: Use role from requester’s hierarchy
            else if (!gs.nil(matrix.u_role)) {
                approverUser = getApproverByRole(current.requested_for, matrix.u_role + '');
            }

            if (approverUser) {
                createApproval(current.sys_id, current.getTableName(), approverUser);
                gs.info('Approval Matrix: Created approval for ' + approverUser);
            }
        }

    } catch (ex) {
        gs.error('Approval Matrix Error: ' + ex.message);
    }

    // --- Helper: Find approver based on user role ---
    function getApproverByRole(userSysId, roleName) {
        var usr = new GlideRecord('sys_user');
        if (usr.get(userSysId)) {
            if (roleName == 'Manager' && usr.manager) return usr.manager;
            if (roleName == 'Director' && usr.u_director) return usr.u_director; // custom field
            if (roleName == 'VP' && usr.u_vp) return usr.u_vp;
        }
        return '';
    }

    // --- Helper: Create approval record ---
    function createApproval(targetSysId, targetTable, approverSysId) {
        var appr = new GlideRecord('sysapproval_approver');
        appr.initialize();
        appr.sysapproval = targetSysId;
        appr.table_name = targetTable;
        appr.state = 'requested';
        appr.approver = approverSysId;
        appr.insert();
    }

})(current, previous);
