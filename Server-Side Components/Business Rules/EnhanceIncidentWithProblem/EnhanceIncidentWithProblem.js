function executeRule(current, previous /*null when async*/) {
    try {
        // Check if problem_id was added or changed
        var isNewLink = !previous || current.problem_id.changes();

        if (isNewLink && current.problem_id) {
            var problemGR = new GlideRecord("problem");

            if (problemGR.get(current.problem_id)) {
                var problemStatement = problemGR.short_description;
                var problemNumber = problemGR.number;

                // Append to description
                current.description = (current.description || '') +
                    "\n\n[Linked Problem] " + problemNumber + ": " + problemStatement;
            }
        }
    } catch (ex) {
        gs.error("An unexpected error occurred while enhancing the Incident with Problem details.");
    }
})(current, previous);
