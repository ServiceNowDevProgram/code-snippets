(function() {
    // Step 1: Define the date range for the previous month
    var startOfMonth = new GlideDateTime();
    startOfMonth.setValue(gs.beginningOfLastMonth());

    var endOfMonth = new GlideDateTime();
    endOfMonth.setValue(gs.endOfLastMonth());

    // Step 2: Query all incidents created in that month
    var gr = new GlideRecord('incident');
    gr.addQuery('opened_at', '>=', startOfMonth);
    gr.addQuery('opened_at', '<=', endOfMonth);
    gr.query();

    // Step 3: Build a map of category counts
    var categoryCount = {};
    while (gr.next()) {
        var category = gr.category ? gr.category.toString() : 'Uncategorized';
        categoryCount[category] = (categoryCount[category] || 0) + 1;
    }

    // Step 4: Build report body
    var reportBody = '';
    var total = 0;

    for (var categoryName in categoryCount) {
        total += categoryCount[categoryName];
        reportBody += categoryName + ': ' + categoryCount[categoryName] + '\n';
    }

    if (total === 0) {
        reportBody = 'No incidents were created in the last month.';
    } else {
        reportBody = 'Total Incidents: ' + total + '\n\n' + reportBody;
    }

    // Step 5: Add month name for better readability
    var monthName = gs.getMonthName(gs.monthsAgo(1));

    // Step 6: Trigger custom event to send email
    // parm1 = report body
    // parm2 = month name
    gs.eventQueue('custom.monthly.incident.report', null, reportBody, monthName);

    gs.info('Monthly Incident Report event triggered for ' + monthName);

})();
