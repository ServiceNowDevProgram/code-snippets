(function executeRule(current, previous /*null when async*/) {
    var detector = new DuplicateCIDetector();
    var duplicates = detector.findDuplicates(
        current.name,
        current.serial_number,
        current.asset_tag,
        current.sys_id
    );

    if (duplicates.length > 0) {
        var message = 'Potential duplicate CIs detected:\n';
        for (var i = 0; i < duplicates.length; i++) {
            message += '- ' + duplicates[i].name + ' (Serial: ' + duplicates[i].serial_number + ')\n';
        }

        gs.addErrorMessage(message);
        current.setAbortAction(true); // stop record save
    }
})(current, previous);
