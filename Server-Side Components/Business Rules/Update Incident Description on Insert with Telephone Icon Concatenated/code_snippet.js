// Update description with telephone icon with specific meaningful description concatenated
(function executeRule(current, previous /*null when async*/) {

    try {
        //code to execute goes here
        var myTelephone = "\u260E"; // Create the telephone icon
        if (current.description == "") {
            current.setValue('description', "You really should " + myTelephone + " home more often."); // Update the description in concatenation with telephone icon script 
        }
    } catch (err) {
        //code to handle error goes here
        gs.error("A runtime error has occurred: " + err);
    }

})(current, previous);
