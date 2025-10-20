// Set first argument to either a User ID or a Sys ID from the "sys_user" table
// Set second and thirt arguments to Start Date and End Date respectively in format YYYY-MM-DD
getUserCapacity("ae44946c835cba90cac7a5e0deaad38f", "2025-01-01", "2025-02-28");

function getUserCapacity(userIdOrSysId, startDateString, endDateString) {
	var grUser = new GlideRecord("sys_user");
	if(grUser.get(userIdOrSysId)) {
		var startDate = new GlideDate(startDateString);
		var endDate = new GlideDate(endDateString);

		var capacityApi = new RMCapacityAPI(startDateString, endDateString);
		var capacityObj = capacityApi.getCapacityForUser(grUser.getUniqueValue());
		var availabilityObj = capacityApi.getAvailabilityForUser(grUser.getUniqueValue());
		var totalDaysInRange = GlideDateTime.subtract(startDate, endDate).getDayPart() + 1;
		var totalWorkingDaysInRange = 0;

		var dateIterator = GlideDateTime(startDateString);

		var currentMonth = dateIterator.getMonthUTC();
		var monthlyTotalCapacity = 0;
		var monthlyTotalAvailability = 0;
		var totalCapacity = 0;
		var totalAvailability = 0;

		for (var i = 0; i < capacityObj.length; i++) {

			var month = dateIterator.getMonthUTC();
			if (month != currentMonth) {
				gs.info("");
				gs.info("Breakdown for Month --- Capacity: " + monthlyTotalCapacity + " --- Availability: " + monthlyTotalAvailability);
				gs.info("");
				currentMonth = month;
				monthlyTotalCapacity = 0;
				monthlyTotalAvailability = 0;
			}
      
			gs.info(dateIterator.getDate() + ": " + capacityObj[i] + " | " + availabilityObj[i]);
			dateIterator.add(86400000);
			if (capacityObj[i] > 0) {
				totalWorkingDaysInRange++;
				totalCapacity += capacityObj[i];
				totalAvailability += availabilityObj[i];
				monthlyTotalCapacity += capacityObj[i];
				monthlyTotalAvailability += availabilityObj[i];
			}
		}
		
		gs.info("");
		gs.info("Breakdown for Month --- Capacity: " + monthlyTotalCapacity + " --- Availability: " + monthlyTotalAvailability);
		gs.info("");

		gs.info("Total days in range: " + totalDaysInRange);
		gs.info("Total working days in range: " + totalWorkingDaysInRange);
		gs.info("Total capacity: " + totalCapacity);
		gs.info("Total availability: " + totalAvailability);
	}
}
