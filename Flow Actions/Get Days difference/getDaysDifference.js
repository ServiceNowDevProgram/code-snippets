// A custom flow action to get the days difference between two dates using GlideDateTime class.
//Input variable of the action are startDate and endDate. Output variable is difference.
(function execute(inputs, outputs) {
    var startDate = new GlideDateTime(inputs.startDate);
    var endDate = new GlideDateTime(inputs.endDate);
    var startDateInMilliseconds = startDate.getNumericValue();
    var endDateInMilliseconds = endDate.getNumericValue();
    var timeDifference = endDateInMilliseconds - startDateInMilliseconds;
    var daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    outputs.difference = daysDifference;
})(inputs, outputs);
