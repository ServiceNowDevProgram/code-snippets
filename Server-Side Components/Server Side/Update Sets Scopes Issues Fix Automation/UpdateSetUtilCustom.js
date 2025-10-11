var UpdateSetUtilCustom = Class.create();
UpdateSetUtilCustom.prototype = {
    initialize: function() {},

    fixScopeBatch: function(grParent) {
        var grUpdate = new GlideRecord('sys_update_xml');
        grUpdate.addEncodedQuery('update_set.parent.parent=' + grParent.getValue('sys_id') + '^ORupdate_set.parent=' + grParent.getValue('sys_id') + '^ORupdate_set=' + grParent.getValue('sys_id') + '^ORupdate_set.base_update_set=' + grParent.getValue('sys_id'));
        grUpdate.query();

        var count = 0;
        var newUpdateSets = {};

        while (grUpdate.next()) {
            if (!grUpdate.getValue('application')) { // No app, should be in a global update set
                if (grUpdate.update_set.application != 'global' && grUpdate.update_set.application.scope != 'global') {
                    count++;

                    if (!newUpdateSets['global']) {
                        newUpdateSets['global'] = {
                            'name': 'Global',
                            'updates': []
                        };
                    }
                    newUpdateSets['global']['updates'].push(grUpdate.getValue('sys_id'));
                }
            }
            // We don't have the same scope for each update. 
            else if (grUpdate.application != grUpdate.update_set.application) {
                count++;

                if (!newUpdateSets[grUpdate.getValue('application')]) {
                    newUpdateSets[grUpdate.getValue('application')] = {
                        'name': grUpdate.getDisplayValue('application'),
                        'updates': []
                    };
                }
                newUpdateSets[grUpdate.getValue('application')]['updates'].push(grUpdate.getValue('sys_id'));
            }
        }

        var parentName = grParent.getValue('name');
        var keys = Object.keys(newUpdateSets);
        for (i in keys) {
            var updates = newUpdateSets[keys[i]]['updates'];
            // Create new update set in the correct scope.
            var grNewSet = GlideRecord('sys_update_set');
            grNewSet.initialize();
            grNewSet.setValue('application', keys[i]);
            grNewSet.setValue('name', parentName + ' - ' + newUpdateSets[keys[i]]['name']);
            grNewSet.setValue('parent', grParent.getValue('sys_id'));
            var newSetSysId = grNewSet.insert();

            for (ii in updates) {
                // Get each update and set the new update set. 
                var updateSysId = updates[ii];
                var grUpdate = new GlideRecord('sys_update_xml');
                if (grUpdate.get(updateSysId)) {
                    grUpdate.setValue('update_set', newSetSysId);
                    grUpdate.update();
                }
            }
        }
        if (count > 0) {
            return count + ' updates were in the wrong scope. ' + keys.length + ' new update sets were created and associated with this parent update set.';
        }
        return 'No update scope issues were found.';
    },

    checkForScopeConflict: function(grParent) {
        var application = grParent.getValue('application');
        var query = 'update_set=' + grParent.getValue('sys_id') + '^application!=' + application + '^ORapplication=NULL';
        if (grParent.application == 'global' || grParent.application.scope == 'global') {
            query = 'update_set=' + grParent.getValue('sys_id') + '^application!=' + application + '^applicationISNOTEMPTY^application.scope!=global';
        }

        var grUpdate = new GlideRecord('sys_update_xml');
        grUpdate.addEncodedQuery(query);
        grUpdate.setLimit(1);
        grUpdate.query();

        if (grUpdate.hasNext()) {
            return true;
        }
		return false;
    },

    type: 'UpdateSetUtilCustom'
};
