// Script Include: CiHealthApi
// Purpose: Return simple CI health data for a given sys_id.

var CiHealthApi = Class.create();
CiHealthApi.prototype = {
  initialize: function() {},

  getHealth: function(ciSysId) {
    if (!ciSysId) throw 'ciSysId required';

    // Example: pretend we have a table x_ci_health with scores
    var gr = new GlideRecord('x_ci_health');
    gr.addQuery('ci', ciSysId);
    gr.orderByDesc('evaluated_at');
    gr.setLimit(1);
    gr.query();

    if (!gr.next()) return { ok: false, message: 'No health data', score: 0, label: 'Unknown' };

    var score = parseInt(gr.getValue('score'), 10) || 0;
    var label = score >= 80 ? 'Good' : score >= 50 ? 'Warning' : 'Critical';

    return {
      ok: true,
      score: score,
      label: label,
      evaluated_at: gr.getDisplayValue('evaluated_at')
    };
  },

  type: 'CiHealthApi'
};
