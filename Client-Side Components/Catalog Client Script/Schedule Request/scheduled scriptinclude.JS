var ScheduledRequestHelper = Class.create();
ScheduledRequestHelper.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  storeScheduledRequest: function() {
    var itemID = this.getParameter('sysparm_item');
    var scheduledTime = this.getParameter('sysparm_time');

    var record = new GlideRecord('x_snc_scheduled_requests'); // Custom table
    record.initialize();
    record.catalog_item = itemID;
    record.scheduled_time = scheduledTime;
    record.insert();

    return 'Scheduled successfully';
  }
});
