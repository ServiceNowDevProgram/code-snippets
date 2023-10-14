var startDateTime = new GlideDateTime('2023-10-10 08:00:00');
var endDateTime = new GlideDateTime('2023-10-10 12:30:00');
var duration = startDateTime.subtract(endDateTime);

gs.info('Time Difference: ' + duration.getDisplayValue());
