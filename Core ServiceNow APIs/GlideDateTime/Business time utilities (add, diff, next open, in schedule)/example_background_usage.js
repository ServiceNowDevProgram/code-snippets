// Background Script demo for BusinessTimeUtils
(function() {
  var SCHEDULE_SYS_ID = 'PUT_YOUR_SCHEDULE_SYS_ID_HERE';
  var TZ = 'Europe/London';

  var util = new BusinessTimeUtils();

  var start = new GlideDateTime(); // now
  var addRes = util.addWorkingHours(SCHEDULE_SYS_ID, 16, start, TZ);
  gs.info('Add 16h ok=' + addRes.ok + ', due=' + (addRes.due ? addRes.due.getDisplayValue() : addRes.message));

  var end = new GlideDateTime(addRes.due || start);
  var diffRes = util.workingMinutesBetween(SCHEDULE_SYS_ID, start, end, TZ);
  gs.info('Working minutes between start and due: ' + diffRes.minutes);

  var openRes = util.nextOpen(SCHEDULE_SYS_ID, new GlideDateTime(), TZ);
  gs.info('Next open ok=' + openRes.ok + ', at=' + (openRes.nextOpen ? openRes.nextOpen.getDisplayValue() : openRes.message));

  var inRes = util.isInSchedule(SCHEDULE_SYS_ID, new GlideDateTime(), TZ);
  gs.info('Is now in schedule: ' + inRes.inSchedule);
})();
