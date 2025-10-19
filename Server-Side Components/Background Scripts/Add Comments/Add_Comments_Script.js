var incidentSysId = 'e9859dd4c39b2210ffd47205e401312d'; // sys_id of the incident
    var userName = 'john.doe';                 // user_name of the user adding the comment
    var commentText = 'This is my Hacktoberfest comment via Background Script!'; // Comment text
    var journalField = 'comments';             // Can be 'comments' or 'work_notes'
	  //var journalField='work_notes';

    var incidentGR = new GlideRecord('incident');
    if (incidentGR.get(incidentSysId)) {
        incidentGR[journalField].setJournalEntry(commentText, userName);
        incidentGR.update();
        gs.info('Comment added successfully on Incident ' + incidentSysId + ' by ' + userName + '.');
    } else {
        gs.error('Incident not found for sys_id: ' + incidentSysId);
    }
