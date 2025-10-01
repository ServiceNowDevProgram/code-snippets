// Table to check (e.g., task, incident, change_request)
var tableName = "task"; 

var ga = new GlideAggregate(tableName);
ga.addAggregate("COUNT", "number");  // Count how many times each number appears
ga.groupBy("number");                // Group records by number
ga.addHaving("COUNT", ">", 1);       // Only show duplicates
ga.query();

gs.print("=== Duplicate Ticket Numbers in " + tableName + " ===");
while (ga.next()) {
    var ticketNumber = ga.getValue("number");
    var count = ga.getAggregate("COUNT", "number");
    gs.print("Number: " + ticketNumber + " | Count: " + count);
}
