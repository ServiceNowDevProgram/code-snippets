# TimeZoneUtils
This Script Include is a tool for handling time-zones in ServiceNow. Specifically, this solves the problem of being unable to get a GlideDate/GlideDateTime object in a SPECIFIED time-zone, without having to get a user object for a user who's already in that specific time-zone.

## getGDT()
Get the GlideDateTime object (as a reference).

This will return a *reference* to the GlideDateTime object. Note that because of JavaScript's
pass-by-reference jive, you should expect that if you set a variable using this method, then
call another method which modifies the GDT object referenced in this class, you will be modifying
the object to which your variable is a reference! In other words, your variable will be modified *in-place*.

## setTZ(tz) / setTimeZone(tz)
Note that you can specify time-zones in a number of formats, like "US/Pacific",
"US\\Eastern", or by short name (such as "mountain").

Currently, this utility only understands a few time-zones by short name. You can print out a list of
pre-defined these supported short-names by printing out the keys in the timeZones property.

Example: gs.print(Object.keys(new TimeZoneUtils().timeZones));

You can reference any time-zone using the following (case-sensitive) format:

{Region}\{Zone}

Example: "Pacific\Guam", or "America\Puerto_Rico"

## getValue()
Gets the value of the current GlideDateTime object.

This will get the value in SYSTEM-time, so it will return the same value no matter which time-zone you've specified.

If the GDT's time value was set prior to passing it into TimeZoneUtils, this will return that date/time
in the specified time-zone.

## getDisplayValue()
Gets the display value of the current GlideDateTime object.

If a time-zone was specified by calling .setTimeZone(), this will return the time in that time-zone.

If the GDT's time value was set prior to passing it into TimeZoneUtils, this will return that date/time
in the specified time-zone.

### Example server-side call (background script)
```javascript
var bmr;
var argsArray = [
	{
		"some_object": {
			"some_object": {
				"some_object": {
					"some_number": 123,
					"some_string": "abc123",
					"some_boolean": 123,
					"some_null": null,
					"some_method": function() {
						return "some_string";
					}
				}
			}
		}
	}
];

argsArray.push(JSON.stringify(argsArray[0]));

/*
	argsArray[0] now contains the object, and argsArray[1] contains the
	 stringified object.
	We'll test whether it's faster to stringify an object, or to parse an
	 object string.
 */

bmr = new BenchmarkRunner()

bmr.printComparisonResults(
	bmr.compareFunctions(
		thingOne,
		thingTwo,
		20000,
		argsArray
	),
	20000
);

function thingOne(arrArgs) {
	var strObj = JSON.stringify(arrArgs[0]);
	return strObj;
}

function thingTwo(arrArgs) {
	var objObj = JSON.parse(arrArgs[1]);
	return objObj;
}