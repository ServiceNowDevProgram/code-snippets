var dateTime = new GlideDateTime();
 var currentDate = dateTime.getLocalDate();
 var grCR = new GlideRecord('change_request');
 grCR.addEncodedQuery("source_table=change_request"); //Add your own query.
 grCR.orderByDesc('number');
 grCR.query();
 while (grCR.next()) {
     var grSA = new GlideRecord('sysapproval_approver');
     grSA.addEncodedQuery("state=requested^sysapproval=" + grCR.sys_id); //Add your own query.
     grSA.query(); 
     while (grSA.next()) {
         var dateCreated = new GlideDateTime(grSA.sys_created_on);
         var dateCreatedLocal = dateCreated.getLocalDate();
         var daysDifferenceMo = gs.dateDiff(dateCreatedLocal, currentDate, true);
         if (daysDifferenceMo > 86400) //It will trigger a reminder after one day currently configure as required.
             gs.eventQueue('event.name', grSA); //Add your own event name to trigger the notification.
     }
 }
