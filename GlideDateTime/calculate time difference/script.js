var earlierDate = new GlideDateTime('2023-10-01 12:00:00');
var laterDate = new GlideDateTime();
var timeDifference = laterDate.getNumericValue() - earlierDate.getNumericValue();
var secondsDifference = timeDifference / 1000;
gs.info('Time difference in seconds: ' + secondsDifference);
