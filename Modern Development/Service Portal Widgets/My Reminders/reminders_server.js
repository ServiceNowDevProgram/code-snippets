(function() {
  
  var currentUserId = gs.getUserID();
  data.reminders = [];

  
  if (input && input.action === 'create_reminder') {
    var newReminder = new GlideRecord('reminder');
    newReminder.initialize();
    newReminder.setValue('user', currentUserId);
    newReminder.setValue('task', input.newReminder.task);
    newReminder.setValue('subject', input.newReminder.subject);
    newReminder.setValue('notes', input.newReminder.notes);
    newReminder.setValue('remind_me', input.newReminder.remind_me);
    newReminder.setValue('field', input.newReminder.field);
    newReminder.setValue('using', input.newReminder.using);
    newReminder.insert();
  }

  
  var reminderGR = new GlideRecord('reminder');
  reminderGR.addQuery('user', currentUserId);
  reminderGR.orderByDesc('sys_created_on'); // Show newest first
  reminderGR.query();

  while (reminderGR.next()) {
    var reminderObj = {};
    reminderObj.sys_id = reminderGR.getUniqueValue();
    reminderObj.subject = reminderGR.getValue('subject');
    reminderObj.notes = reminderGR.getValue('notes');
    reminderObj.remind_me = reminderGR.getValue('remind_me');
    reminderObj.field_display = reminderGR.getDisplayValue('field'); // Get user-friendly display value
    reminderObj.using = reminderGR.getValue('using');
    reminderObj.task_display = reminderGR.getDisplayValue('task'); // Get task number/display value
    data.reminders.push(reminderObj);
  }

})();
