(function executeRule(current, previous /*null when async*/ ) {

    var user = gs.getUserDisplayName();
    gs.addInfoMessage("Welcome " + user); //This adds info message on top of the form

})(current, previous);


//output will be Display name of current logged in user
//Example output : Welcome Abel Tuter
