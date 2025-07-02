// Business Rule: 'After' Insert on 'sn_hr_core_case'
(function executeRule(current, previous /*null when async*/) {

    if (current.priority == "1" && current.subject_person.getValue('VIP') == 'true') {
        var newTask = new GlideRecord('sn_hr_core_task');
        newTask.initialize();
        newTask.short_description = 'Priority VIP HR task for - ' + current.number;
        newTask.assigned_to = current.assigned_to;
        newTask.parent = current.sys_id;
        newTask.insert();
        
        gs.addInfoMessage('A related HR task has been created for this HR case.');
    }

})(current, previous);
