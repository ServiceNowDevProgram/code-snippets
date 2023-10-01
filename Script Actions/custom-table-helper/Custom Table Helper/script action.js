(function() {
    /*
    When new custom tables are created extended from task, some of the common activities are to 
    	- set number field to readonly
    	- over-ride reference qualifier for assignment_group & assigned_to
    This script action just does that!

    Why not put this in business rule? Well, weirdly business rules don't trigger when new custom table is created through App Engine Studio
    */

    //ua.customtable.insert event is triggered when a new custom table is created.
    var tableName = event.parm1.toString();
    var tableScope = '';
    
    var getNewTable = new GlideRecord('sys_db_object');
    getNewTable.addEncodedQuery('name=' + tableName);
    getNewTable.setLimit(1);
    getNewTable.query();
    if (getNewTable.next()) {
        tableScope = getNewTable.getValue('sys_scope');
    }

    if (tableName && tableScope) {
        var isExtendedFromTask = isParentTask(tableName);
        if (isExtendedFromTask) {
            //table is extended from task, create overrides
            createOverride(tableScope, tableName, 'number', true, true, false, '');
            createOverride(tableScope, tableName, 'assignment_group', false, false, true, 'active=true');
            createOverride(tableScope, tableName, 'assigned_to', false, false, true, 'active=true');
        } else {
            //do nothing! - current table is not extended from task.
        }
    }

    //task could be parent/grand-parent/great grand-parent, keep checking recursively
    function isParentTask(tableName) {
        var getTable = new GlideRecord('sys_db_object');
        getTable.addEncodedQuery('super_classISNOTEMPTY^name=' + tableName);
        getTable.setLimit(1);
        getTable.query();
        if (!getTable.next()) {
            return false;
        }
        if (getTable.super_class.name.toString() === 'task') {
            return true;
        }
        var parentTable = getTable.super_class.name.toString();
        return isParentTask(parentTable);
    }

    //now create overrides
    function createOverride(scope, table, column, overrideRead, setReadOnly, overrideRef, refQual) {
        var overrideGR = new GlideRecord('sys_dictionary_override');
        overrideGR.newRecord();
        overrideGR.setValue('sys_scope', scope);
        overrideGR.setValue('base_table', 'task');
        overrideGR.setValue('name', table);
        overrideGR.setValue('element', column);
        overrideGR.setValue('read_only_override', overrideRead);
        overrideGR.setValue('read_only', setReadOnly);
        overrideGR.setValue('reference_qual_override', overrideRef);
        overrideGR.setValue('reference_qual', refQual);
        overrideGR.insert();
    }

})();