(function executeRule(current, previous /*null when async*/ ) {

    gs.addHighMessage("This is high priority");
    gs.addLowMessage("This is low priority");
    gs.addModerateMessage("This is moderate priority");
    gs.addSuccessMessage("This is a success message");

})(current, previous);
