(function executeRule(current, previous /*null when async*/) {

    // Retrieve the SysIDs from system properties - holding in system properties to overcome not hardcoding the SysID
    var highPriorityLabelSysId = gs.getProperty('label.high_priority');
    var blockedLabelSysId = gs.getProperty('label.blocked');
    var readyForQALabelSysId = gs.getProperty('label.ready_for_qa');
    var qaCompletedLabelSysId = gs.getProperty('label.qa_completed');
    var readyForDeploymentLabelSysId = gs.getProperty('label.ready_for_deployment');

    // Query the 'vtb_card' table for related task records
    var gr = new GlideRecord('vtb_card');
    gr.addQuery('task', current.sys_id);
    gr.query();

    // Loop through all matching vtb_card records
    while (gr.next()) {

        // Handle High Priority label
        var highPriorityTag = new GlideRecord('label_entry');
        highPriorityTag.addQuery('table', 'vtb_card');
        highPriorityTag.addQuery('table_key', gr.sys_id);
        highPriorityTag.addQuery('label', highPriorityLabelSysId);
        highPriorityTag.query();
        if (current.priority == 1 && !highPriorityTag.next()) {  // Add label if not already present
            highPriorityTag = new GlideRecord('label_entry');
            highPriorityTag.label = highPriorityLabelSysId; // High Priority Label SysID
            highPriorityTag.table = 'vtb_card';
            highPriorityTag.read = 'yes';
            highPriorityTag.title = "High Priority Tag for " + gr.task.number;
            highPriorityTag.table_key = gr.sys_id;
            highPriorityTag.insert();
        } else if (current.priority != 1 && highPriorityTag.next()) {  // Remove label if priority is not high
            highPriorityTag.deleteRecord();
        }

        // Handle Blocked label
        var blockedTag = new GlideRecord('label_entry');
        blockedTag.addQuery('table', 'vtb_card');
        blockedTag.addQuery('table_key', gr.sys_id);
        blockedTag.addQuery('label', blockedLabelSysId);
        blockedTag.query();
        if (current.blocked == true && !blockedTag.next()) {  // Add label if not already present
            blockedTag = new GlideRecord('label_entry');
            blockedTag.label = blockedLabelSysId; // Blocked Label SysID
            blockedTag.table = 'vtb_card';
            blockedTag.read = 'yes';
            blockedTag.title = "Blocked Tag for " + gr.task.number;
            blockedTag.table_key = gr.sys_id;
            blockedTag.insert();
        } else if (current.blocked == false && blockedTag.next()) {  // Remove label if blocked is false
            blockedTag.deleteRecord();
        }

        // Handle Ready for QA label
        var readyForQATag = new GlideRecord('label_entry');
        readyForQATag.addQuery('table', 'vtb_card');
        readyForQATag.addQuery('table_key', gr.sys_id);
        readyForQATag.addQuery('label', readyForQALabelSysId);
        readyForQATag.query();
        if (current.u_implementation_stage == 'QA Required' && !readyForQATag.next()) {  // Add label if not already present
            readyForQATag = new GlideRecord('label_entry');
            readyForQATag.label = readyForQALabelSysId; // Ready for QA Label SysID
            readyForQATag.table = 'vtb_card';
            readyForQATag.read = 'yes';
            readyForQATag.title = "Ready for QA Tag for " + gr.task.number;
            readyForQATag.table_key = gr.sys_id;
            readyForQATag.insert();
        } else if (current.u_implementation_stage != 'QA Required' && readyForQATag.next()) {  // Remove label if stage is no longer QA Required
            readyForQATag.deleteRecord();
        }

        // Handle QA Completed label
        var qaCompletedTag = new GlideRecord('label_entry');
        qaCompletedTag.addQuery('table', 'vtb_card');
        qaCompletedTag.addQuery('table_key', gr.sys_id);
        qaCompletedTag.addQuery('label', qaCompletedLabelSysId);
        qaCompletedTag.query();
        if (current.u_implementation_stage == 'QA Completed' && !qaCompletedTag.next()) {  // Add label if not already present
            qaCompletedTag = new GlideRecord('label_entry');
            qaCompletedTag.label = qaCompletedLabelSysId; // QA Completed Label SysID
            qaCompletedTag.table = 'vtb_card';
            qaCompletedTag.read = 'yes';
            qaCompletedTag.title = "QA Completed Tag for " + gr.task.number;
            qaCompletedTag.table_key = gr.sys_id;
            qaCompletedTag.insert();
        } else if (current.u_implementation_stage != 'QA Completed' && qaCompletedTag.next()) {  // Remove label if stage is no longer QA Completed
            qaCompletedTag.deleteRecord();
        }

        // Handle Ready for Deployment label
        var readyForDeploymentTag = new GlideRecord('label_entry');
        readyForDeploymentTag.addQuery('table', 'vtb_card');
        readyForDeploymentTag.addQuery('table_key', gr.sys_id);
        readyForDeploymentTag.addQuery('label', readyForDeploymentLabelSysId);
        readyForDeploymentTag.query();
        if (current.u_implementation_stage == 'Ready for Deployment' && !readyForDeploymentTag.next()) {  // Add label if not already present
            readyForDeploymentTag = new GlideRecord('label_entry');
            readyForDeploymentTag.label = readyForDeploymentLabelSysId; // Ready for Deployment Label SysID
            readyForDeploymentTag.table = 'vtb_card';
            readyForDeploymentTag.read = 'yes';
            readyForDeploymentTag.title = "Ready for Deployment Tag for " + gr.task.number;
            readyForDeploymentTag.table_key = gr.sys_id;
            readyForDeploymentTag.insert();
        } else if (current.u_implementation_stage != 'Ready for Deployment' && readyForDeploymentTag.next()) {  // Remove label if stage is no longer Ready for Deployment
            readyForDeploymentTag.deleteRecord();
        }

    }

})(current, previous);
