(function() {
    // Get last week's incident count
    var lastWeekAgg = new GlideAggregate('incident');
    lastWeekAgg.addAggregate('COUNT');
    lastWeekAgg.addEncodedQuery('opened_at>=javascript:gs.beginningOfLastWeek()^opened_at<=javascript:gs.endOfLastWeek()');
    lastWeekAgg.query();

    var lastWeekCount = 0;
    if (lastWeekAgg.next()) {
        lastWeekCount = lastWeekAgg.getAggregate('COUNT');
    }

    // Get this week's incident count
    var thisWeekAgg = new GlideAggregate('incident');
    thisWeekAgg.addAggregate('COUNT');
    thisWeekAgg.addEncodedQuery('opened_at>=javascript:gs.beginningOfThisWeek()^opened_at<=javascript:gs.endOfThisWeek()');
    thisWeekAgg.query();

    var thisWeekCount = 0;
    if (thisWeekAgg.next()) {
        thisWeekCount = thisWeekAgg.getAggregate('COUNT');
    }

    // Compare and log
    var diff = thisWeekCount - lastWeekCount;
    if (diff > 0)
        gs.info("Incident count increased by " + diff + " compared to last week.");
    else if (diff < 0)
        gs.info("Incident count decreased by " + Math.abs(diff) + " compared to last week.");
    else
        gs.info("No change in incident volume week-over-week.");
})();
