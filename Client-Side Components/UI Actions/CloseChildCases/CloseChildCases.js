(function executeAction() {
    var grCase = new GlideRecord('sn_customerservice_case');
    grCase.addQuery('parent', current.sys_id);
    grCase.query();
    
    var counter = 0;
    while (grCase.next()) {
        if (grCase.state != 3) { // 3 = Closed
            grCase.resolution_code = '16';
            grCase.close_notes = 'This case was auto closed from the parent case.';
            grCase.state = 3;
            grCase.update();
            counter++;
        }
    }

    //  Show info message only if any cases were closed
    if (counter > 0) {
        gs.addInfoMessage(counter + ' child case(s) have been closed.');
    }

    action.setRedirectURL(current);
})();
