(function() {
    //exclude email replies based on group membership
    var answer = true; //default is true
    var groupMember = current.getValue('assigned_to'); //get value of the desired field
    groupMember = gs.getUser().getUserByID(groupMember); //prepare the user data for the isMemberOf lookup function
    if (groupMember.isMemberOf('Special Group')) { //check if membership is true
        var notes = current.comments.getJournalEntry(1).split('\n'); //gather most recent comment and split each new line into a new array
        if (notes[1].indexOf('reply from:') == 0) { //check first new line and if it starts with 'reply from:', don't send an email
            answer = false;
        }
    }
    return answer;
})();
