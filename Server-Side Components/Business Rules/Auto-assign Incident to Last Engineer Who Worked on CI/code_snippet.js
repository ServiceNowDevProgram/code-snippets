// This script auto-assign Incident to Last Engineer Who Worked on CI.
// Before Business Rule on incident
(function(current, previous){
  var hist = new GlideRecord('incident');
  hist.addQuery('cmdb_ci', current.cmdb_ci);
  hist.orderByDesc('resolved_at');
  hist.query();
  if (hist.next()) {
    if(hist.resolved_by.active == true){
    current.assigned_to = hist.resolved_by;
  }
  }
})(current, previous);
