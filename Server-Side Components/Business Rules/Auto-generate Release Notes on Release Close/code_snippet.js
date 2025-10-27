// This script gather change summaries and build notes. 
// After Business Rule on rm_release table
(function(current, previous){
  if (current.state == 'closed'){
    var ch = new GlideRecord('change_request');
    ch.addQuery('release', current.sys_id);
    ch.query();
    var notes = [];
    while(ch.next()) notes.push(ch.number + ': ' + ch.short_description);
    current.u_release_notes = notes.join('\n');
    current.update();
  }
})(current, previous);
