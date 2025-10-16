var CatalogTaskGenerator = Class.create();
CatalogTaskGenerator.prototype = {
    initialize: function() {
        this.taskTable = 'sc_task';
    },
    generateTasks: function(ritmSysId, variableName) {
        var ritmGR = new GlideRecord('sc_req_item');
        if (!ritmGR.get(ritmSysId)) {
            gs.error('RITM not found for sys_id: ' + ritmSysId);
            return;
        }
        var taskType = ritmGR.variables[variableName].toString();
        switch (taskType) {
            case 'Laptop':
                this._createTask(ritmGR, 'Assign Laptop Asset', 'Hardware Fulfillment', 10);
                this._createTask(ritmGR, 'Install Core Software', 'Software Team', 20);
                break;
            case 'Desktop':
                this._createTask(ritmGR, 'Deploy Desktop Image', 'Infrastructure Team', 10);
                this._createTask(ritmGR, 'Setup Docking Station', 'Hardware Fulfillment', 20);
                break;
            case 'Mobile Phone':
                this._createTask(ritmGR, 'Order SIM Card', 'Telecom Team', 10);
                this._createTask(ritmGR, 'Configure MDM Profile', 'Mobile Support', 20);
                break;
            // add Cases as Catalog Tasks Required....
            default:
                gs.info('CatalogTaskGenerator: No specific tasks defined for ' + variableName + ' value: ' + taskType);
                break;
        }
    },

    _createTask: function(ritmGR, shortDesc, assignmentGroupName, order) {
        var taskGR = new GlideRecord(this.taskTable);
        taskGR.initialize();
        taskGR.request_item = ritmGR.sys_id;
        taskGR.request = ritmGR.request;
        taskGR.short_description = shortDesc;
        taskGR.order = order;
        var groupGR = new GlideRecord('sys_user_group');
        if (groupGR.get('name', assignmentGroupName)) {
            taskGR.assignment_group = groupGR.sys_id;
        } else {
            gs.warn('CatalogTaskGenerator: Assignment Group not found: ' + assignmentGroupName);
        }

        taskGR.insert();
    },

    type: 'CatalogTaskGenerator'
};
