var difference, task_wrk_notes, task_add_cmnt, rAddCmnt, ritm_add_cmnt;
    task_add_cmnt = current.comments.getJournalEntry(1);

    //Remove timestamp and name from additional comment
    var reg_exp = new RegExp('\n');
    var i = task_add_cmnt.search(reg_exp);
    if (i > 0) {
        task_wrk_notes = task_add_cmnt.substring(i + 1, task_add_cmnt.length);
    }

    var grSRI = new GlideAggregate('sc_req_item');
    grSRI.addQuery('sys_id', current.parent);
    grSRI.query();

    if (grSRI.next()) {
        ritm_add_cmnt = grSRI.comments.getJournalEntry(1);

        //Remove timestamp and name from additional comment
        var i1 = ritm_add_cmnt.search(reg_exp);
        if (i1 > 0) {
            rAddCmnt = ritm_add_cmnt.substring(i1 + 1, ritm_add_cmnt.length);
        }
        difference = task_wrk_notes.indexOf(rAddCmnt);

        if (difference == -1) // If No match found
        {
            //Originally prefixed, but no longer needed:  "Comment from IT user working on your request: "
			grSRI.comments = task_wrk_notes.trim();
            grSRI.update();
        }
    }
