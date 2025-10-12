(function executeRule(current, previous /*null when async*/) {

    var tsk_number = current.getDisplayValue('task'); // Get Change Request number
    var time = current.getValue('remind_me'); // Reminder time in minutes

    var subject = 'Change Request ' + tsk_number + ' Closure Approaching in ' + time + ' Minutes';
    var body = 'This is a reminder that Change Request ' + tsk_number +
        ' is scheduled to close in ' + time + ' minutes. Please ensure that all necessary ' +
        'tasks, validations, and documentation are completed before the closure.';

    current.setValue('subject', subject);
    current.setValue('notes', body);
    current.setValue('using', 'outlook');

})(current, previous);
