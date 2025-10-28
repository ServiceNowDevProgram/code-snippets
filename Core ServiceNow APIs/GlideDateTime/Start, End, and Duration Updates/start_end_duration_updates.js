// condition
current.variables.access_end == '' || current.variables.access_start.changes() || current.variables.how_long.changes() || current.variables.access_end.changes()

//function
(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    // calculates the end time of an task based on the start time and duration
    if (current.variables.access_end == '' || current.variables.access_start.changes() || current.variables.how_long.changes()) {
        if (current.variables.access_start.changes()) {
            current.work_notes = 'Start Time Modified' + '\n\nNew value: ' + current.variables.access_start.getDisplayValue() + '\nPrevious value: ' + previous.variables.access_start.getDisplayValue();
        }
        if (current.variables.how_long.changes()) {
            current.work_notes = 'Duration Modified' + '\n\nNew value: ' + current.variables.how_long.getDisplayValue() + '\nPrevious value: ' + previous.variables.how_long.getDisplayValue();
        }
        var startTime = new GlideDateTime(current.variables.access_start.getValue()); // getting start time
        var dur = new GlideDateTime(current.variables.how_long.getValue()); // getting duration and converting to GlideDateTime
        dur = dur.getNumericValue() / 1000; // calculating the total duration in seconds

        startTime.addSeconds(dur); // add the seconds to the start time to calculate end time

        current.variables.access_end = startTime.getValue(); // set the end time

        gs.addInfoMessage("End time automatically adjusted based on start time and duration");

    } else if (current.variables.access_end.changes()) {
        current.work_notes = 'End Time Modified'+ '\n\nNew value: ' + current.variables.access_end.getDisplayValue() + '\nPrevious value: ' + previous.variables.access_end.getDisplayValue();
        var stgdt = new GlideDateTime(current.variables.access_start); // getting start time
        var engdt = new GlideDateTime(current.variables.access_end); // getting end time
        var durgd = new GlideDuration();
        durgd = GlideDateTime.subtract(stgdt, engdt); // getting duration

        current.variables.how_long = durgd; // set the duration

        gs.addInfoMessage("Duration was automatically adjusted");
    }

  // update an associated task
    var sc = new GlideRecord('sc_task');
    sc.addQuery('request_item', current.sys_id);
    sc.addActiveQuery();
    sc.query();
    if (sc.next()) {
        var desc = sc.getValue('description');
        var short_desc = sc.getValue('short_description');
        if (short_desc.indexOf(' – Updated') < 0) {
            sc.work_notes = 'Original Task: \n' + short_desc + '\n\nOriginal Description: \n' + desc;
        }
        sc.setValue('due_date', current.variables.access_start);
        sc.setValue('short_description', 'Open access for ' + current.requested_for.name + ' at ' + current.variables.access_start.getDisplayValue() + ' – Updated');
        sc.setValue('description', 'Please open access for ' + current.requested_for.name + ' at ' + current.variables.access_start.getDisplayValue() + '. – Updated \n\n See ' + current.number + ' work notes for previous task info.');
        sc.update();
    }

})(current, previous);
