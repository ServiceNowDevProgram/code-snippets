var TimeZoneUtils = Class.create();
TimeZoneUtils.prototype = {
	
	/**
	 * Upon initialization, you can pass in a GlideDateTime object you've already created and set to a specific time.
	 * The reference to this object will be used, and your GDT will be modified in-place. Alternatively, you may choose
	 * not to specify a parameter upon initialization, and a new GlideDateTime object will be created, used, and returned
	 * with the current time in the specified time-zone.
	 *
	 * @param {GlideDateTime} [gdt] - A reference to the (optional) GlideDateTime object to be modified IN-PLACE.
	 * If not specified, a new one will be generated, and a reference returned.
	 */
	initialize: function(gdt) {
		this.gdt = (typeof gdt == 'undefined') ? (new GlideDateTime()) : gdt;
	},
	
	/**
	 * Get the GlideDateTime object (as a reference).
	 * This will return a *reference* to the GlideDateTime object. Note that because of JavaScript's
	 *  pass-by-reference jive, you should expect that if you set a variable using this method, then
	 *  call another method which modifies the GDT object referenced in this class, you will be modifying
	 *  the object to which your variable is a reference! In other words, your variable will be modified *in-place*.
	 * @returns {*|GlideDateTime}
	 */
	getGDT: function() {
		return this.gdt;
	},
	
	/**
	 * Get the number representing the current GDT object's offset from UTC, in hours.
	 * If the GlideDateTime object is in the Pacific time zone for example, this method will return either
	 * "8" or "7" (depending on DST).
	 * @returns {number}
	 */
	getOffsetHours: function() {
		return ((Number(this.gdt.getTZOffset() / 1000) / 60) / 60);
	},
	
	/**
	 * Note that you can specify time-zones in a number of formats, like "US/Pacific",
	 * "US\\Eastern", or by short name (such as "mountain").
	 *
	 * Currently, this utility only understands a few time-zones by short name. You can print out a list of
	 *  pre-defined these supported short-names by printing out the keys in the timeZones property.
	 *  Example: gs.print(Object.keys(new TimeZoneUtils().timeZones));
	 *
	 * You can reference any time-zone using the following (case-sensitive) format:
	 *  <Region>\<Zone>
	 *  Example: "Pacific\Guam", or "America\Puerto_Rico"
	 *
	 * @param {Packages.java.util.TimeZone|string} tz - The TimeZone object to use to set the time-zone of
	 *  the current GlideDateTime object.
	 * @returns {*|GlideDateTime}
	 */
	setTimeZone: function(tz) {
		
		/*
			FYI: http://twiki.org/cgi-bin/xtra/tzdatepick.html
			Click any of the locations there, and on the corresponding page, find the
			"Timezone" value.
			These are the valid rows for the time-zone parameter.
 		*/
		
		//ensure we've got a string and that it's lower-case.
		tz = (typeof tz === 'string') ? tz : tz.toString();
		//Validate the TZ string, and get a TimeZone Java object from it.
		tz = this._getTimeZoneFromString(tz);
		
		this.gdt.setTZ(tz);
		return this.gdt;
	},
	
	/**
	 * Gets the display value of the current GlideDateTime object.
	 * If a time-zone was specified by calling .setTimeZone(), this will return the time in that time-zone.
	 * If the GDT's time value was set prior to passing it into TimeZoneUtils, this will return that date/time
	 * in the specified time-zone.
	 * @returns {string} The current time, in the specified time-zone.
	 */
	getDisplayValue: function() {
		return this.gdt.getDisplayValue();
	},
	
	/**
	 * @returns {string} The current value, in SYSTEM time, of the GlideDateTime object.
	 */
	getValue: function() {
		return this.gdt.getValue();
	},
	
	/**
	 *
	 * @param {Packages.java.util.TimeZone|string} tz - The TimeZone object to use to set the time-zone of
	 * @returns {*} The TimeZone object, OR false if an invalid time-zone was passed in.
	 * @private
	 */
	_getTimeZoneFromString: function(tz) {
		//If it's a valid time-zone coming in, bob's our uncle.
		if (this._isValidTimeZone(tz)) {
			if (this.timeZones.hasOwnProperty(tz.toLowerCase())) {
				return this.timeZones[tz.toLowerCase()];
			} else {
				return Packages.java.util.TimeZone.getTimeZone(tz);
			}
		}
		//Otherwise, check if it matches one of our timeZone object properties.
		var shortTZ = this._getShortTimeZoneName(tz);
		if (this._isValidTimeZone(shortTZ)) {
			return this.timeZones[shortTZ.toLowerCase()];
		}
		
		//If nothing else has returned by now, it means the time zone isn't valid.
		gs.warn('Invalid time zone specified. Time zone: ' + tz, 'TimeZoneUtils Script Include, _getTimeZoneFromString method');
		return false;
	},
	
	/**
	 * Checks if the passed string is a valid time zone string.
	 * @param {string} tz - The TimeZone string to use to set the time-zone of
	 * @returns {boolean}
	 * @private
	 */
	_isValidTimeZone: function(tz) {
		var tzObj = Packages.java.util.TimeZone.getTimeZone(tz);
		//If the tz string wasn't valid, then getID will return the string "GMT",
		//which - unless the user specified GMT as the time-zone, will not match the string argument.
		//However, if it does match, OR if the arg is found in the timeZones object, then we're good to go.
		return ((String(tzObj.getID()) === tz) || this.timeZones.hasOwnProperty(tz.toLowerCase()));
	},
	
	/**
	 * Try another way of getting the proper time-zone. This is used when to look for a time-zone based only on the short-name.
	 * @param {string} tz - The time-zone name we're looking at, at a string.
	 * @returns {string} The time-zone, or a valid version of it if it needs validation, in lower-case.
	 * @private
	 */
	_getShortTimeZoneName: function(tz) {
		//Check if the string contains a forward-slash, back-slash, or underscore.
		if (tz.indexOf('\\') >= 0 || tz.indexOf('/') >= 0 || tz.indexOf(' ') >= 0) {
			/*
				If it contains a "/" or "\", grab everything after that character.
				Trim the resulting (sub-)string.
				If the remainder contains a space, replace it with an underscore.
			 */
			tz = tz.slice(tz.indexOf('\\') + 1).slice(tz.indexOf('/') + 1).trim().replace(/ /g, '_');
		}
		return tz.toLowerCase();
	},
	
	/**
	 * Just a reference to the setTimeZone method.
	 * @param {Packages.java.util.TimeZone|string} tz - The TimeZone object to use to set the time-zone of the current GlideDateTime object.
	 * @returns {*}
	 */
	setTZ: function(tz) {
		return this.setTimeZone(tz);
	},
	
	/**
	 * These are the pre-defined short-names for certain common time-zones.
	 * Feel free to expand upon this object.
	 
	 * Currently, this utility only understands a few pre-defined time-zones by short name.
	 * You can print out a list of these supported short-names by printing out the keys in the timeZones property.
	 * Example: gs.print(Object.keys(new TimeZoneUtils().timeZones));
	 * In a future update, this list will update itself with rows from the sys_choice table, here:
	 * https://YOUR_INSTANCE.service-now.com/sys_choice_list.do?sysparm_query=nameINjavascript%3AgetTableExtensions('sys_user')%5Eelement%3Dtime_zone
	 */
	timeZones: {
		alaska:      Packages.java.util.TimeZone.getTimeZone('US/Alaska'),
		eastern:     Packages.java.util.TimeZone.getTimeZone('US/Eastern'),
		central:     Packages.java.util.TimeZone.getTimeZone('US/Central'),
		mountain:    Packages.java.util.TimeZone.getTimeZone('US/Mountain'),
		hawaii:      Packages.java.util.TimeZone.getTimeZone('US/Hawaii'),
		pacific:     Packages.java.util.TimeZone.getTimeZone('US/Pacific'),
		arizona:     Packages.java.util.TimeZone.getTimeZone('US/Arizona'),
		guam:        Packages.java.util.TimeZone.getTimeZone('Pacific/Guam'),
		puerto_rico: Packages.java.util.TimeZone.getTimeZone('America/Puerto_Rico'),
		india:       Packages.java.util.TimeZone.getTimeZone('Asia/Kolkata'),
		utc: 		 Packages.java.util.TimeZone.getTimeZone('UTC')
	},
	
	type: 'TimeZoneUtils'
};