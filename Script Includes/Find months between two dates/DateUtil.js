var DateUtils = Class.create();
DateUtils.prototype = {
    initialize: function () { },

    getMonths: function (startDate, endDate) {

        var MONTHS_IN_A_YEAR = 12;
        var totalMonths = 0;

        var startDateGd = new GlideDate();
        startDateGd.setValue(startDate);
        var startDateTimeGdt = new GlideDateTime(startDateGd);
        var startDateMonth = startDateTimeGdt.getMonthLocalTime();
        var startDateYear = startDateTimeGdt.getYearLocalTime();

        var endDateGt = new GlideDate();
        endDateGt.setValue(endDate);
        var endDateTimeGdt = new GlideDateTime(endDateGt);
        var endDateMonth = endDateTimeGdt.getMonthLocalTime();
        var endDateYear = endDateTimeGdt.getYearLocalTime();

        if (startDateYear != endDateYear) {
            totalMonths = MONTHS_IN_A_YEAR - startDateMonth + endDateMonth + (endDateYear - startDateYear - 1) * MONTHS_IN_A_YEAR;
        } else {
            totalMonths = endDateMonth - startDateMonth;
        }

        return totalMonths;

    },

    type: 'DateUtils'
};