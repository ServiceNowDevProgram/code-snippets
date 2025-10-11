(function executeRule(current, previous) {

    if (current.isNewRecord() || !current.isValidRecord() || current.operation() == 'delete') {
        return;
    }
    var fieldsToCheck = ['work_notes', 'comments', 'state'];
    var allFieldsSame = true;
    for (var i = 0; i < fieldsToCheck.length; i++) {
        var field = fieldsToCheck[i];
        if (current.changes.call(current, field) && current[field].toString() !== previous[field].toString()) {
            allFieldsSame = false;
            break; 
        }
    }
    if (allFieldsSame) {
        gs.info('BR skipped redundant integration update for ' + current.sys_class_name + ': ' + current.number);
        current.setAbortAction(true);
    }

})(current, previous);
