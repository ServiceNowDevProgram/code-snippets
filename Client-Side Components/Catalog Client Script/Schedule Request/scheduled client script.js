function onSubmit() {
  var scheduledTime = g_form.getValue('scheduled_time');
  var currentTime = new Date().toISOString();

  if (scheduledTime > currentTime) {
    var ga = new GlideAjax('ScheduledRequestHelper');
    ga.addParam('sysparm_name', 'storeScheduledRequest');
    ga.addParam('sysparm_item', g_form.getUniqueValue());
    ga.addParam('sysparm_time', scheduledTime);
    ga.getXMLAnswer(function(response) {
      alert('Your request has been scheduled for: ' + scheduledTime);
    });
    return false; // Prevent immediate submission
  }

  return true; // Submit immediately if time is now or past
}
