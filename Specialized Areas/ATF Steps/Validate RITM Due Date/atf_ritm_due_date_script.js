(function(outputs, steps, params, stepResult, assertEqual) {
    // Calculate what the due date should be and compare to the actual due date
    var ritmQuerySysId = ''; // This is the sys id of the Record Query ATF Test Step for the RITM record (NOTE: This needs toe be updated to match your test step)
    var grRITM = new GlideRecord('sc_req_item');
    grRITM.get(steps(ritmQuerySysId).first_record);
    var calculatedDue; // set up our calculation

    var deliveryTime = grRITM.cat_item.delivery_time.dateNumericValue(); // get delivery time in ms

    if (deliveryTime) {
        var dur = new GlideDuration(deliveryTime);
        var scheduleID = gs.getProperty('glide.sc.item.delivery_schedule'); // Property contains the sys id of the schedule used for this date calculation
        var schedule = new GlideSchedule(scheduleID);
        var gdt = new GlideDateTime(grRITM.opened_at); // due date should be set based on the item's opened timestamp
        calculatedDue = schedule.add(gdt, dur);
    }

    var actualDue = new GlideDateTime(grRITM.due_date);

    testAssertion = {
        name: "The Due Dates Match!",
        shouldbe: calculatedDue,
        value: actualDue
    };
    assertEqual(testAssertion);

})(outputs, steps, params, stepResult, assertEqual);
