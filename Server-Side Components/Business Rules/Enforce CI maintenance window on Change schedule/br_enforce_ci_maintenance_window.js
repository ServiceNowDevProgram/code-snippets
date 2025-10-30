// Business Rule: Enforce CI maintenance window on Change schedule
// Table: change_request | When: before insert, before update

(function executeRule(current, previous /*null*/) {
  // ===== Configuration =====
  var BLOCK_WHEN_NO_SCHEDULE = false;  // if true, a CI without maintenance_schedule causes failure
  var REQUIRE_BOTH_BOUNDARIES = true;  // if true, both planned start and end must be inside maintenance window
  var TIMEZONE = 'Europe/London';      // optional; '' to use schedule/instance default
  // =========================

  try {
    // Only run when dates are meaningful
    if (!current.planned_start_date || !current.planned_end_date) return;

    // Build GDTs once
    var psd = new GlideDateTime(current.planned_start_date.getDisplayValue());
    var ped = new GlideDateTime(current.planned_end_date.getDisplayValue());
    if (psd.after(ped)) {
      gs.addErrorMessage('Planned start is after planned end. Please correct the schedule.');
      current.setAbortAction(true);
      return;
    }

    // Collect related CIs for this Change
    var ciIds = [];
    var tci = new GlideRecord('task_ci');
    tci.addQuery('task', current.getUniqueValue());
    tci.query();
    while (tci.next()) ciIds.push(String(tci.getValue('ci_item')));

    if (ciIds.length === 0) {
      // No CIs; nothing to validate
      return;
    }

    var anyPass = false;
    var missingScheduleCount = 0;
    var evaluated = 0;

    // Evaluate each CI's maintenance schedule
    var ci = new GlideRecord('cmdb_ci');
    ci.addQuery('sys_id', 'IN', ciIds.join(','));
    ci.query();

    while (ci.next()) {
      evaluated++;

      var schedRef = ci.getValue('maintenance_schedule');
      if (!schedRef) {
        missingScheduleCount++;
        continue;
      }

      var sched = new GlideSchedule(schedRef, TIMEZONE || '');
      var startOK = sched.isInSchedule(psd);
      var endOK = sched.isInSchedule(ped);

      var pass = REQUIRE_BOTH_BOUNDARIES ? (startOK && endOK) : (startOK || endOK);
      if (pass) {
        anyPass = true;
        break; // at least one CI permits this window
      }
    }

    // Handle missing schedules according to policy
    if (!anyPass) {
      var hasBlockingNoSchedule = BLOCK_WHEN_NO_SCHEDULE && missingScheduleCount > 0;
      if (hasBlockingNoSchedule || evaluated > 0) {
        gs.addErrorMessage(buildMessage());
        current.setAbortAction(true);
      }
    }

    function buildMessage() {
      var parts = [];
      parts.push('Planned window does not fall inside any related CI maintenance schedules.');
      if (REQUIRE_BOTH_BOUNDARIES) parts.push('Both start and end must be inside a permitted window.');
      if (missingScheduleCount > 0) {
        parts.push((BLOCK_WHEN_NO_SCHEDULE ? 'Blocking' : 'Ignoring') + ' ' + missingScheduleCount + ' CI(s) with no maintenance schedule.');
      }
      return parts.join(' ');
    }
  } catch (e) {
    gs.error('Maintenance window validation failed: ' + e.message);
    // Be safe: do not block due to a runtime error
  }
})(current, previous);
