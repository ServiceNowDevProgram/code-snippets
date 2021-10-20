(function executeRule(current, previous /*null when async*/ ) {

    var user = gs.getUserDisplayName();
    gs.addInfoMessage("Welcome " + user); //This adds info message on top of the form

})(current, previous);
