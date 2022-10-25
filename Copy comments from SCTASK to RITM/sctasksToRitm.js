var diff, tcmnt1, tcmnt, ritmcmnt1, ritm_cmnt;
    tcmnt = current.comments.getJournalEntry(1);

    //Remove timestamp and name from additional comment
    var reg_exp = new RegExp('\n');
    var i = tcmnt.search(reg_exp);
    if (i > 0) {
        tcmnt1 = tcmnt.substring(i + 1, tcmnt.length);
    }

    var ritm_gr = new GlideRecord('sc_req_item');
    ritm_gr.addQuery('sys_id', current.parent);
    ritm_gr.query();

    if (ritm_gr.next()) {
        ritm_cmnt = ritm_gr.comments.getJournalEntry(1);

        //Remove timestamp and name from additional comment
        var i1 = ritm_cmnt.search(reg_exp);
        if (i1 > 0) {
            ritmcmnt1 = ritm_cmnt.substring(i1 + 1, ritm_cmnt.length);
        }
        diff = tcmnt1.indexOf(ritmcmnt1);

        if (diff == -1) // If No match found
        {
            //Originally prefixed, but no longer needed:  "Comment from IT user working on your request: "
			ritm_gr.comments = tcmnt1.trim();
            ritm_gr.update();
        }
    }
