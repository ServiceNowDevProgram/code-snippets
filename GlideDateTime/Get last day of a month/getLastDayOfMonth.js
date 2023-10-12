/**
 * Get last day of a month from date field
 */
var dateFieldValue = current.date_field;
var year = dateField.getFullYear();
var month = dateField.getMonth() + 1;
var daysInMonth = gs.daysInMonth(year, month);
var lastDayOfMonth = gs.dateGenerate(year, month, daysInMonth);
gs.info(lastDayOfMonth);

/**
 * Get last day of a month from GlideDateTime
 */
var gdt = new GlideDateTime();
gdt.setDayOfMonthUTC(1000);
gs.info(gdt.getDate());
