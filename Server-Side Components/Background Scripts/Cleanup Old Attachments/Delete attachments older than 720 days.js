var attachment = new GlideRecord('sys_attachment');
attachment.addQuery('sys_created_on', '<=', gs.daysAgo(720));
attachment.query();
var count = 0;
while (attachment.next()) {
    attachment.deleteRecord();
    count++;
}
gs.print('Deleted ' + count + ' attachments older than 720 days.');
