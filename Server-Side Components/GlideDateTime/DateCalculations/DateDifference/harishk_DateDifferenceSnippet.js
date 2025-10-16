// Author: Harish Kothandapani
// Purpose: Calculate difference in days between two dates

function getDateDifferenceInDays(startDate, endDate) {
  try {
    var gdtStart = new GlideDateTime(startDate);
    var gdtEnd = new GlideDateTime(endDate);
    var diff = gs.dateDiff(gdtStart.getDisplayValue(), gdtEnd.getDisplayValue(), true);
    // gs.dateDiff returns seconds when third param = true
    return Math.floor(diff / (60 * 60 * 24)); // convert seconds to days
  } catch (e) {
    gs.error('Error calculating date difference: ' + e.message);
    return null;
  }
}

// Example usage:
// gs.info(getDateDifferenceInDays('2025-10-01 00:00:00', '2025-10-16 00:00:00'));
