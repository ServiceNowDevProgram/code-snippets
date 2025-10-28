// Transform Map onBefore script: set priority on insert, not on update
(function runTransformScript(source, map, log, target) {
  try {
    if (String(action).toLowerCase() !== 'insert') {
      log.info('Priority unchanged on update for number: ' + (target.number || '(new)'));
      return;
    }

    var impact = Number(source.impact) || 3;   // 1..3 typical
    var urgency = Number(source.urgency) || 3; // 1..3 typical

    // Simple matrix: priority = impact + urgency - 1, clamped 1..5
    var p = Math.max(1, Math.min(5, (impact + urgency) - 1));
    target.priority = String(p);
    log.info('Priority set on insert to ' + p);
  } catch (e) {
    log.error('Insert-only priority failed: ' + e.message);
  }
})(source, map, log, target);
