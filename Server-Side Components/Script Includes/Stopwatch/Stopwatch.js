/*
	Acts as a stop watch to log the seconds or milliseconds of an operation.

	Usage:

	var watch = new Stopwatch();
	watch.start();
	gs.sleep(1000); // Do something
	watch.stop();
	watch.getElapsedTimeMilliseconds();
*/
var Stopwatch = Class.create();
Stopwatch.prototype = {

	startDateTime: null,

	endDateTime: null,

	initialize: function () {
	},

	/**
	 * Logs the start of the operation
	 */
	start: function () {
		this.startDateTime = new GlideDateTime();
		gs.info("Started: " + this.startDateTime.getDisplayValue(), "StopWatch");
	},

	/**
	 * 
	 * @param {boolean} logInfo, indicates to log the end of operation in system log. Default is false 
	 */
	stop: function (logInfo) {
		this.endDateTime = new GlideDateTime();

		if (logInfo) {
			gs.info("Total Elapsed Time Seconds: " + this.getElapsedTimeSeconds(), "StopWatch");
			gs.info("Total Elapsed Time Milliseconds: " + this.getElapsedTimeMilliseconds(), "StopWatch");
		}
	},

	/**
	 * 
	 * @returns the durations in seconds
	 */
	getElapsedTimeSeconds: function () {
		if(!this.endDateTime) throw new Error("Please call stop the watch by calling the Stop() method first.");
		return gs.dateDiff(this.startDateTime, this.endDateTime, true);
	},

	/**
	 * 
	 * @returns the durations in milliseconds
	 */
	getElapsedTimeMilliseconds: function () {
		if(!this.endDateTime) throw new Error("Please stop the watch by calling the Stop() method first.");
		return this.endDateTime.getNumericValue() - this.startDateTime.getNumericValue();
	},

	type: 'Stopwatch'
};