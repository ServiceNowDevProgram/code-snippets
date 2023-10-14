var currentDateTime = new GlideDateTime();
var daysToAdd = 7; // 7 days into the future
currentDateTime.addDaysUTC(daysToAdd);
gs.info('Future Date: ' + currentDateTime.getDisplayValue());
