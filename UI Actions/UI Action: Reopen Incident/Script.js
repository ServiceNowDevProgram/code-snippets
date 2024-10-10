// UI Action: Reopen Incident
// Table: incident
// Condition: current.state == 7 // Closed
// Client: false

(function executeAction(current) {
    current.state = 2; // Set to 'In Progress'
    current.update(); // Update the record
})(current);


