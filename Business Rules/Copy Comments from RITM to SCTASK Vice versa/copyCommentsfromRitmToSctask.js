// Sample code to Copy RITM additional Comments /  user visible comments to SCtask worknotes 
var diff, tcomnt, tcmnt1, ritmcomnt1, ritmcomnt;
    ritmcomnt = current.comments.getJournalEntry(1);
    var reg_exp = new RegExp('\n');
    var i = ritmcomnt.search(reg_exp);
    if (i > 0) {
        ritmcomnt1 = ritmcomnt.substring(i + 1, ritmcomnt.length);
    }

    // Get the list of open sctasks for the RITM
	var ritm_gr = new GlideRecord('sc_task');
    ritm_gr.addQuery('request_item', current.sys_id);
    // Exclude any closed tasks
	ritm_gr.addQuery('state', '!=', '3');
    ritm_gr.addQuery('state', '!=', '4');
    ritm_gr.addQuery('state', '!=', '7');
    ritm_gr.query();

    while (ritm_gr.next()) {
        tcmnt1 = ritm_gr.comments.getJournalEntry(1);

        //Remove timestamp and name from additional comment
        var i1 = tcmnt1.search(reg_exp);
        if (i1 > 0) {
            tcomnt = tcmnt1.substring(i1 + 1, tcmnt1.length);
        }
        diff = ritmcomnt1.indexOf(tcomnt);

        if (diff == -1) // If No match found
        {
			ritm_gr.work_notes = "Additional Comment from RITM: " + ritmcomnt1.trim();
            ritm_gr.update();
        }
    }
