 // Generic/parent scheduled job table = sysauto
 var grScheduledJob = new GlideRecord("sysauto");
 if (grScheduledJob.get(sys_id)) {
	// In order to run the job successfully, we need the more specific
	// child table name of the scheduled job (eg. sysauto_script)
     var classname = grScheduledJob.getValue('sys_class_name');
     var scheduledJob = new GlideRecord(classname);
     if (scheduledJob.get(sys_id))
         gs.executeNow(scheduledJob);
 }
