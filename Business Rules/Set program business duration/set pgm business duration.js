(function executeRule(current, previous /*null when async*/ ) {

    // Set the program duration if it's got no child records

    try {
      
        new PPM_Utils().setProgramDates(current, 'sys_id');

    } catch (e) {
        if (gs.isInteractive() && gs.hasRole('admin')) {
            gs.addInfoMessage('Business rule: Set pgm business duration - ' + e.message);
        }
        gs.error(e.message);
    }

})(current, previous);
