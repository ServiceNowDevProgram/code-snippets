// This script will auto-calculate Change Implementation Risk Using ML Score.
// Call an internal ML score table and set risk.
// Before Business Rule on change_request
(function(current, previous){
  var ml = new GlideRecord('u_ml_change_risk');
  ml.addQuery('u_signature', current.short_description);
  ml.query();
  if (ml.next()) current.u_ml_risk_score = ml.u_score;
  else current.u_ml_risk_score = 50;
})(current, previous);
