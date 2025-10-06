// Business Rule: After Insert on 'sn_hr_core_case'
(function executeRule(current, previous /*null when async*/) {

    // Check if priority is high and subject person is a VIP
    const isHighPriority = current.priority == '1';
    const isVIP = current.subject_person.getValue('VIP') === 'true';

    if (isHighPriority && isVIP) {
        try {
            const task = new GlideRecord('sn_hr_core_task');
            task.initialize();

            task.short_description = `Priority VIP HR task for - ${current.number}`;
            task.assigned_to = current.assigned_to;
            task.parent = current.sys_id;

            const taskSysId = task.insert();

            if (taskSysId) {
                gs.addInfoMessage('✅ A related HR task has been successfully created for this VIP HR case.');
            } else {
                gs.addErrorMessage('⚠️ Failed to create HR task for VIP case.');
            }

        } catch (err) {
            gs.error('Error while creating VIP HR Task: ' + err.message);
        }
    }

})(current, previous);

