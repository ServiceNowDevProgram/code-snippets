(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    var tables = ["incident", "change_request", "problem", "sc_task", "task"]; //tables to check for 
    var tickets = []; //empty array

    for (var i = 0; i < tables.length; i++) { //traversing through all the tables
        var Findtickets = new GlideRecord(tables[i]); //gliding through each table
        Findtickets.addActiveQuery(); //active query check
        Findtickets.addQuery("assigned_to", current.sys_id); //check if the current user who is being inactivated is assigned to user
        Findtickets.query();
        while (Findtickets.next()) {
            tickets.push(Findtickets.number.toString()); //if any tickets are found then add them to the array
        }
    }
    if (tickets.length() != 0) { //if tickets array is not empty then abort the action.
        gs.info("Here are the tickets that were assigned to the user you are trying to inactivate : " + tickets);
        gs.addErrorMessage("Cannot inactivate user as there are active tickets assigned, Please check logs for all the ticket no.'s.");
        current.setAbortAction(true);
    }

})(current, previous);
