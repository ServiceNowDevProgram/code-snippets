/* ISO8601 Date. 30 Hours were put for demonstration purposes */
var date = '2022-05-01T30:00:00Z';

gs.info('Parsed date: ' + parseISO8601DateTime(date));

/* Function to parse ISO8601 date format */
function parseISO8601DateTime(isoDate) {
    try {
        /* Check if the input date is valid and not the default value */
        if (isoDate && isoDate !== '1970-01-01T00:00:00Z') {
            /* Split the date and time components */
            var dateAndTime = isoDate.split('T');  

            /* Ensure there are both date and time components */
            if (dateAndTime.length !== 2) {
                /* Handle invalid input format */
                gs.error('Invalid ISO8601 date format: ' + isoDate);
                return null;
            }

            var date = dateAndTime[0];
            var time = dateAndTime[1].substring(0, 8);

            /* Construct a valid GlideDateTime object */
            var parsedDateTime = new GlideDateTime(date + ' ' + time);
            return parsedDateTime;
        }
    } catch (e) {
        gs.error('Error parsing date: ' + e.message);
    }
    /* Return false in case of any errors */
    return null;
}
