(function executeRule(current, previous /*null when async*/ ) {

    var gdt = new GlideDateTime();
    gdt.addWeeksLocalTime(1);
    gs.eventQueueScheduled("sn_sow_inc_post_incident_review.reminder", current, "", "1", gdt); //this will trigger after 1 weeks
    gdt.addWeeksLocalTime(1);
    gs.eventQueueScheduled("sn_sow_inc_post_incident_review.reminder", current, "", "2", gdt); //this will trigger after 2 weeks
    gdt.addWeeksLocalTime(1);
    gs.eventQueueScheduled("sn_sow_inc_post_incident_review.reminder", current, "", "3", gdt); //this will trigger after 3 weeks

})(current, previous);
