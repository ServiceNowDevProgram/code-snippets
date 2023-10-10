var total_users = 0;
var diag = new Diagnostics();

while (diag.nextNode()) {
    var diagNode = diag.getNode();
    var summary = diagNode.stats.sessionsummary;

    if (summary) {
        total_users += parseInt(diagNode.stats.sessionsummary["@logged_in"]);
    }
}

gs.info(total_users);

