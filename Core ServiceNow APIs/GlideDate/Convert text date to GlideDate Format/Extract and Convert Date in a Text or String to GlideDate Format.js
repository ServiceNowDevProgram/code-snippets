/**
 * This code snippet extracts a date from a string formatted as "20 Nov 2020",
 * converts it to GlideDate format, and assigns the date value to the u_last_patch_date field.
 * 
 * While this example is intended for use in a Business Rule (BR), it can be modified
 * and utilized in any script within ServiceNow.
 */
(function executeRule(current, previous /*null when async*/) {

    // Example value: "kernel-headers-2.6.32-754.35.1.el6.x86_64 20 Nov 2020"
    var patchDetails = current.u_patch_description;

    // Split the patchDetails string by spaces
    var parts = patchDetails.split(' ');

    // Find the last three parts which should be day, month, and year
    var day = parts[parts.length - 3]; // Example: "20"
    var month = parts[parts.length - 2]; // Example: "Nov"
    var year = parts[parts.length - 1];  // Example: "2020"

    // Construct the formatted date string in yyyy/mm/dd format
    var formattedDate = year + '/' + monthToNumber(month) + '/' + (day ? day : '01');

    // Function to convert month abbreviation to number (e.g., Jan to 01)
    function monthToNumber(monthAbbreviation) {
        var months = {
            "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
            "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
        };
        return months[monthAbbreviation] || '01'; // Default to '01' if month is not found
    }

    // Output the formatted date (for debugging purposes)
    gs.info("Formatted Date: " + formattedDate);

    // Set the formatted date into the u_last_patch_date field using GlideDate
    var gd = new GlideDate();
    gd.setValue(formattedDate);
    current.u_last_patch_date = gd.getDisplayValue(); // Store the date in GlideDate format

    // Update the current record
    current.setWorkflow(false);
    current.update();

})(current, previous);
