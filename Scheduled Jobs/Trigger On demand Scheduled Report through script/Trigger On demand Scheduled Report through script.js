var scheduleReport = new GlideRecord('sysauto_report'); //gliding the scheduled report
scheduleReport.get("<scheduled report sys_id>");//replace <scheduled report sys_id> with the sys_id of the scheduled report not the report sys_id
SncTriggerSynchronizer.executeNow(scheduleReport);
