//Table: Incident
//When to Run: After update
(function executeRule(current, previous /*null when async*/ ) {

    if (current.priority == 2)
        gs.addHighMessage("This is a high incident, and assign it as soon as possible.");
    if (current.state == 6)
        gs.addLowMessage("The incident will be marked as closed automatically after 7 days.");
    if (current.state == 6)
        gs.addModerateMessage("Refer to the resolution information section for the resolution notes.");
    if (current.assigned_to.changes())
        gs.addSuccessMessage("The notification has been sent to the assignee.");

})(current, previous);
