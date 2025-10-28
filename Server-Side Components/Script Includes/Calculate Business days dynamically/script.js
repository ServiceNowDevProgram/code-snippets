// Function to add any number of business days to a given date
function add_business_days(date, num_days) {
    var result_date = new GlideDateTime(date);
    var added_days = 0;

    while (added_days < num_days) {
        result_date.addDaysUTC(1);
        var day_of_week = result_date.getDayOfWeekUTC();
        if (day_of_week != 6 && day_of_week != 7) { // Skip Saturday (6) and Sunday (7)
            added_days++;
        }
    }

    return result_date.getDate();
}

// Example usage:
gs.print(add_business_days('2025-10-24 12:00:00', 5)); // Adds 5 business days
