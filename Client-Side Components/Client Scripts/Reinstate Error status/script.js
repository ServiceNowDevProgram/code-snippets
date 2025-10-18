function onSubmit() {
    // Cutoff time for submission in CST.
    var cutoffTime = "20:00:00";

    // Get the current date and time in CST
    var currentDate = new Date();
    var currentCSTDate = new Date(
        currentDate.toLocaleString("en-US", {
            timeZone: "America/Chicago"
        })
    );

    // Get time from current CST date
    var currentCSTTime = currentCSTDate.toTimeString().substring(0, 8);

    // Get last day of the month
    var dayOfMonth = currentCSTDate.getDate();
    var lastDayOfMonth = new Date(
        currentCSTDate.getFullYear(),
        currentCSTDate.getMonth() + 1,
        0
    ).getDate();

    if ((dayOfMonth === 16 || dayOfMonth === lastDayOfMonth) && currentCSTTime > cutoffTime) {
        var workDate = g_form.getValue("work_date");

        if (workDate) {
            var formattedWorkDate = new Date(workDate + "T00:00:00");
            // If work_date is on or before current date, block submission
            if (formattedWorkDate <= currentCSTDate) {
                g_form.addErrorMessage(
                    "The time period closed for time submission at 8:00 PM CST. Time must be billed in the next time period." + ": " + lastDayOfMonth
                );
                return false;
            }
        }
    }
    return true;
}
