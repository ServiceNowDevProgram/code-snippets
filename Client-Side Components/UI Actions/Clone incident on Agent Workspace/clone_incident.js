function cloneIncident() {
    var answer = confirm(getMessage("Are you sure you want to Clone this Incident?"));
    if (answer)
        gsftSubmit(null, g_form.getFormElement(), 'clone_incident');
    else
        return false;
}

if (typeof window == 'undefined') {
    //Clone Incident
    var grInc = new GlideRecord('incident');
    grInc.initialize();
    grInc.company = current.company;
    grInc.short_description = current.short_description;
    grInc.description = current.description;
    grInc.contact_type = "Self-service";
    grInc.category = current.category;
    grInc.subcategory = current.subcategory;
    grInc.setDisplayValue('assignment_group', "Assignment Group Name"); // or use grInc.assignment_group = current.assignment_group.toString();
    /*
	uncomment this code if comments need to be copied
    //Remove Timestamp from Comments
    var getComments = current.comments.getJournalEntry(1);
    var regex = new RegExp("\n");
    var returnComments = getComments;
    var getRegex = getComments.search(regex);
    if (getRegex > 0) {
        returnComments = getComments.substring(getRegex + 1, getComments.length);
    }
    gr.comments = returnComments;
    */
    grInc.insert();
    action.setRedirectURL(grInc);
}
