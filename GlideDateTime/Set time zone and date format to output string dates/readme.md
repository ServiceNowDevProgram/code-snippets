# Set time zone and date format to output dates.
Examples
```javascript
// Set time zone and date format to output string dates.
// Current time "2021-10-23 16:29:08" JST +0900
var gDateTime = new GlideDateTime();  
var calendar = Packages.java.util.Calendar.getInstance();
//Import dates in milliseconds
calendar.setTimeInMillis(gDateTime.getNumericValue());
//Java Date Object
var javaobjDate = calendar.getTime();

// Set the date format you want to output.
var simpleDateFormat = new Packages.java.text.SimpleDateFormat("EEEE,MMMM dd,yyyy HH:mm:ss z Z");
// Time zone string for current user ("Japan")
var strTz = gs.getSession().getTimeZoneName();
// Java TimeZone Object
var javaobjTz = Packages.java.util.TimeZone.getTimeZone(strTz);
// Set TimeZone
simpleDateFormat.setTimeZone(javaobjTz);
// Convert and date output
var strDate = '' + simpleDateFormat.format(javaobjDate);
// Output "Saturday,October 23,2021 16:29:08 JST +0900"
gs.info(strDate);
```

### Similar Functions: GlideDate.getByFormat()
Output in UTC, not in the time zone set by the user.

Examples
```javascript
// Current time "2021-10-23 17:03:56" JST +0900
var gd = new GlideDate();
// Time zone string for current user ("Japan")
var strTz = gs.getSession().getTimeZoneName();
var javaobjTz = Packages.java.util.TimeZone.getTimeZone(strTz);
gd.setTZ(javaobjTz);
gs.info( gd.getByFormat("EEEE,MMMM dd,yyyy HH:mm:ss z Z") );
// "Saturday,October 23,2021 08:03:56 UTC +0000"
// Output in UTC, not in the time zone set by the user.
```
