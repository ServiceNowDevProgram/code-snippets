var startDateTime = "2024-10-13 01:00:00";   // This date is in GMT
gs.info('---> starting date/time (in GMT): ' + startDateTime);

// The following returns the GMT date time object (converted from the string value).  
// So next step is to get the local offset and add it to GMT
var gmtDateTime = new GlideDateTime(startDateTime);  
gs.info('---> converted to GlideDateTime: ' + startDateTime.toString());

// getTZOffset is returned in negative milliseconds...
// so you have to get rid of that 
var correctedOffset = new GlideTime(gmtDateTime.getTZOffset() * -1);   
gs.info('---> converted to Corrected Offset Value: ' + correctedOffset.toString());

// NOW you can add the corrected value to the original gmtDateTime
gmtDateTime.add(correctedOffset);   // adds the milliseconds value to the gmt date/time object
gs.info('---> new timezone corrected Date/Time: ' + gmtDateTime.toString());

// true local day of week value
var dayOfWeek = gmtDateTime.getDayOfWeek();  
gs.info('---> true Day of the Week: ' + dayOfWeek.toString());
 
