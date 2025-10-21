// Now Experience component (simplified snippet)
// Renders a badge based on CI health from CiHealthApi via GlideAjax.

(function() {
  // minimal component-like function for illustration inside repo
  function renderBadge(targetEl, ciSysId) {
    if (!ciSysId) {
      targetEl.innerHTML = '<span>CI not specified</span>';
      return;
    }

    var ga = new GlideAjax('CiHealthApi');
    ga.addParam('sysparm_name', 'getHealth');
    ga.addParam('sysparm_ciSysId', ciSysId);
    ga.getXMLAnswer(function(answer) {
      try {
        var res = JSON.parse(answer);
        if (!res.ok) {
          targetEl.innerHTML = '<span>' + (res.message || 'No data') + '</span>';
          return;
        }
        var cls = res.label === 'Good' ? 'badge-good' : res.label === 'Warning' ? 'badge-warn' : 'badge-crit';
        targetEl.innerHTML =
          '<span class="badge ' + cls + '">' + res.label + ' (' + res.score + ')</span>' +
          '<small> Evaluated: ' + res.evaluated_at + '</small>';
      } catch (e) {
        targetEl.innerHTML = '<span>Failed to parse health data</span>';
      }
    });
  }

  // Example usage in a portal page widget:
  // renderBadge(document.getElementById('ci-badge'), 'PUT_CI_SYS_ID');

  // rudimentary styles for illustration
  var style = document.createElement('style');
  style.textContent = '.badge{padding:4px 8px;border-radius:6px;color:#fff;margin-right:6px}' +
    '.badge-good{background:#2e7d32}.badge-warn{background:#f9a825}.badge-crit{background:#c62828}';
  document.head.appendChild(style);

  // expose for demo
  window.renderCiHealthBadge = renderBadge;
})();
