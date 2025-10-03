/**
 * Get the age difference between two dates in years, months, and days.
 * 
 * @param {GlideDateTime} startDate - The earlier date (e.g., birthdate).
 * @param {GlideDateTime} endDate   - The later date (e.g., today).
 * @returns {Object} { years: number, months: number, days: number }
 */
function getAgeYMD(startDate, endDate) {

    var start = new GlideDateTime(startDate);
    var end = new GlideDateTime(endDate);

    // Extract components
    var sYear = parseInt(start.getYearUTC(), 10);
    var sMonth = parseInt(start.getMonthUTC(), 10);
    var sDay = parseInt(start.getDayOfMonthUTC(), 10);

    var eYear = parseInt(end.getYearUTC(), 10);
    var eMonth = parseInt(end.getMonthUTC(), 10);
    var eDay = parseInt(end.getDayOfMonthUTC(), 10);

    var years = eYear - sYear;
    var months = eMonth - sMonth;
    var days = eDay - sDay;

    // Adjust if negative
    if (days < 0) {
        months--;
        var temp = new GlideDateTime(end);
        temp.addMonthsUTC(-1);
        days += temp.getDaysInMonthUTC();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return {
        years: years,
        months: months,
        days: days
    };
}

// Example usage:
// var birthdate = new GlideDateTime("1997-06-19 00:00:00");
// var today = new GlideDateTime(); // current date
// var age = getAgeYMD(birthdate, today);

// gs.info("Age: " + age.years + " years, " + age.months + " months, " + age.days + " days");

// Output
// Age: 28 years, 3 months, 14 days
