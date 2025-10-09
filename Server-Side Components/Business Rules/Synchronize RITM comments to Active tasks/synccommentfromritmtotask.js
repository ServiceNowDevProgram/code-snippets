(function executeRule(current, previous /*null when async*/ ) {

    var ritmLink = '[code]<a href="nav_to.do?uri=' + current.getLink() + '" target="_blank">' + current.number.toString() + '</a>[/code]';

    var scTask = new GlideRecord('sc_task');
    scTask.addQuery('request_item', current.sys_id);
    scTask.addActiveQuery();
    scTask.query();
    while (scTask.next()) {
        scTask.comments = 'Updated comments on: ' + ritmLink + '\n' + current.comments.getJournalEntry(1);
        scTask.update();
    }

})(current, previous);
