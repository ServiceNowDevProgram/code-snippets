var gr = new GlideRecord('sn_customerservice_case');
gr.addQuery('parent', current.sys_id);
gr.query();
var counter = 0;
while (gr.next()) {
    if (gr.state != 3) {
        gr.resolution_code = '16';
        gr.close_notes = 'This case was auto closed from the parent case.';
        gr.state = '3';
        gr.update();
        counter++;
    }
}
gs.addInfoMessage(counter + ' cases have been closed.');
action.setRedirectURL(current);
