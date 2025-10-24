var BenchmarkRunner = Class.create();
BenchmarkRunner.prototype = {
	initialize : function () {
		this.timers = {};
	},
	
	/**
	 * Execute two functions with the specified arguments, and get info about which was faster
	 *  (and by how much).
	 *
	 * @param {function} methodOne - The first method to test, for comparison with the second.
	 * @param {function} methodTwo - The second method to test, for comparison with the first.
	 * @param {number} iterations - The number of times to run each function. Very quick functions,
	 *  you might want to run hundreds or even thousands of times.
	 * This is to make sure that the average duration is meaningful by eliminating any random
	 *  variations in performance.
	 * @param {Array} [args=[]] - An optional array of arguments to pass into your test functions.
	 * The same array will be passed to both test function. You can have your function accept an
	 *  argument called args, and access its elements in your test function like so:
	 * var grSomeRecord = args[0];
	 * @param {boolean} [runToCache=true] - If runToCache is set to true (or unspecified), run each
	 *  function one time BEFORE beginning the timer, in order to ensure that any cachable data is
	 *  cached.
	 * There are times when you may not want to do this, such as if it's the "first-run" time of
	 * each function that you want to compare.
	 * @return {{method_two : {duration_ms : number, ms_per_iteration : number, begin_ms : number,
	 *     end_ms : number, duration_sec : number}, comparison : {iteration_faster_by_ms : number,
	 *     which_was_faster : number, slower_multiple : number, total_faster_by_ms : number},
	 *     method_one : {duration_ms : number, ms_per_iteration : number, begin_ms : number, end_ms
	 *     : number, duration_sec : number}}}
	 *
	 * method_one/method_two:
	 *
	 *  begin_ms: The current epoch time (in ms) at which the test of that function began.
	 *
	 *  end_ms: The current epoch time (in ms) at which the test of that function ended.
	 *
	 *  duration_ms: The total number of milliseconds it took to run the passed function
	 *   the specified number of times.
	 *
	 *  duration_sec: The total number of seconds it took to run the passed function the
	 *   specified number of times.
	 *
	 *  ms_per_iteration: The average time (in ms) it took to run the function one time.
	 *
	 * comparison:
	 *
	 *  which_was_faster: Will be integer 0, 1, or 2. If 1, the first passed function
	 *   was faster. If 1, the function in the first argument was faster; if 2, the
	 *   second was faster. If this is set to zero, then either something went wrong,
	 *   or both functions took EXACTLY the same amount of time. This would be... rare,
	 *   even when passing the exact same function in twice, just due to random variations.
	 *
	 *   iteration_faster_by_ms: The number of milliseconds by which the faster method was
	 *    faster. This may well be set to zero or near zero if the difference per-iteration
	 *    is relatively negligible, but that doesn't mean that there is literally no
	 *    difference between the two. For example, if the specific operation you're testing
	 *    is very fast, the faster method may be faster by only 0.1ms, but if it's a
	 *    commonly used function, you may end up doing it tens of thousands of times per day.
	 *
	 *  total_faster_by_ms: The TOTAL number of milliseconds by which the faster method was
	 *   faster, compounded across all iterations. For example, if the second method was
	 *   faster by 2ms per iteration and you specified 100 iterations, then which_was_faster
	 *   would be set to 2, iteration_faster_by_ms would be set to 2, and total_faster_by_ms
	 *   would be set to 200.
	 */
	compareFunctions : function (methodOne, methodTwo, iterations, args, runToCache) {
		var benchmarkData = {
			'method_one' : {
				'begin_ms' : 0,
				'end_ms' : 0,
				'duration_ms' : 0,
				'duration_sec' : 0,
				'ms_per_iteration' : 0
			},
			'method_two' : {
				'begin_ms' : 0,
				'end_ms' : 0,
				'duration_ms' : 0,
				'duration_sec' : 0,
				'ms_per_iteration' : 0
			},
			'comparison' : {
				'which_was_faster' : 0,
				'iteration_faster_by_ms' : 0,
				'total_faster_by_ms' : 0,
				'slower_multiple' : 0
			}
		};
		
		//Set default args value if not set
		args = (typeof args == 'undefined') ? [] : args;
		runToCache = (typeof runToCache == 'undefined') ? true : runToCache;
		
		benchmarkData.method_one = this.benchmarkSingleFunction(
			methodOne,
			iterations,
			args,
			runToCache
		);
		benchmarkData.method_two = this.benchmarkSingleFunction(
			methodTwo,
			iterations,
			args,
			runToCache
		);
		
		benchmarkData.comparison.which_was_faster = this._calculateWhichWasFaster(
			benchmarkData
		);
		benchmarkData.comparison.total_faster_by_ms = Math.abs(
			benchmarkData.method_one.duration_ms - benchmarkData.method_two.duration_ms
		);
		benchmarkData.comparison.iteration_faster_by_ms = (
			benchmarkData.comparison.total_faster_by_ms / iterations
		);
		benchmarkData.comparison.slower_multiple = this._calculateSlowerMultiple(benchmarkData);
		
		return benchmarkData;
	},
	
	benchmarkSingleFunction : function (functionToBenchmark, iterations, args) {
		var i;
		var benchmarkData = {
			'begin_ms' : 0,
			'end_ms' : 0,
			'duration_ms' : 0,
			'duration_sec' : 0,
			'ms_per_iteration' : 0
		};
		
		//Set default args value if not set
		args = (typeof args == 'undefined') ? [] : args;
		//runToCache = (typeof runToCache == 'undefined') ? true : runToCache;
		
		/* SETUP
		* If runToCache is set to true (or unspecified), run the method one time BEFORE
		*  beginning the timer, in order to ensure that any cachable data is cached.
		* There are times when you may not want to do this, such as if it's the "first-run"
		*  time of each function that you want to compare.
		* */
		functionToBenchmark(args);
		
		//Set begin_ms to begin benchmark
		benchmarkData.begin_ms = new GlideDateTime().getNumericValue();
		
		//Run the passed function however many times indicated in the iterations arg.
		for (i = 0; i < iterations; i++) {
			functionToBenchmark(args);
		}
		
		//Set end_ms to end benchmark
		benchmarkData.end_ms = new GlideDateTime().getNumericValue();
		
		//Calculate durations
		benchmarkData.duration_ms = benchmarkData.end_ms - benchmarkData.begin_ms;
		benchmarkData.duration_sec = benchmarkData.duration_ms / 1000;
		benchmarkData.ms_per_iteration = benchmarkData.duration_ms / iterations;
		
		return benchmarkData;
	},
	
	/**
	 * Pass in the info about the comparison you just did, and have that info printed to the
	 *  info logs.
	 * @param {Object} benchmarkData - The benchmark data, as returned from calling the
	 *  .compareFunctions() method.
	 * @param {Number} iterations - The number of iterations this comparison was done for
	 *  (passed in as the third argument to .compareFunctions()).
	 * @returns {string} The message to be logged (which will also be logged using gs.info()).
	 */
	printComparisonResults : function (benchmarkData, iterations) {
		var logMsg;
		
		if (benchmarkData.comparison.which_was_faster === 0) {
			logMsg = 'Both methods took the exact same amount of time.\n' +
				'Complete benchmark details: \n' +
				JSON.stringify(
					benchmarkData, null, 2
				);
			gs.info(logMsg);
			return logMsg;
		}
		logMsg = '\nMethod 1 took ' + benchmarkData.method_one.duration_ms + 'ms. Method 2 took ' +
			benchmarkData.method_two.duration_ms + 'ms.\n' +
			'Method ' + benchmarkData.comparison.which_was_faster + ' was faster by ' +
			benchmarkData.comparison.total_faster_by_ms + 'ms total, over ' + iterations +
			' iterations (or ' + benchmarkData.comparison.iteration_faster_by_ms +
			'ms faster per-iteration). \nThe slower function takes ' +
			benchmarkData.comparison.slower_multiple + ' times as long as the faster function ' +
			'to run.\n\n' +
			'Complete benchmark details: \n' +
			JSON.stringify(
				benchmarkData, null, 2
			);
		gs.info(logMsg);
		
		return logMsg;
	},
	
	/**
	 * Starts the specified timer by ID (or the default timer if timer ID is not specified)
	 * @param {string} [timerID="default"] The ID of the timer to start or stop.
	 * If an ID is not specified, it will be set to "default".
	 * @return {BenchmarkRunner}
	 */
	startTimer : function (timerID) {
		timerID = (typeof timerID == 'undefined') ? 'default' : timerID;
		
		if (this.timers.hasOwnProperty(timerID)) {
			throw new Error(
				'Timer with ID ' + timerID + ' already exists. Unable to start ' +
				'multiple times with the same ID.'
			);
		}
		
		this.timers[timerID] = new this._Timer(timerID);
		this.timers[timerID].startTimer();
		return this;
	},
	
	/**
	 * Stops the specified timer by ID (or the default timer if timer ID is not specified)
	 * @param {string} [timerID="default"] The ID of the timer to start or stop.
	 * If an ID is not specified, it will be set to "default".
	 * @return {this._Timer} An instance of the _Timer class, on which you can call
	 *  .getDurationMS() or .getDurationSec() to get the timer duration.
	 */
	stopTimer : function (timerID) {
		timerID = (typeof timerID == 'undefined') ? 'default' : timerID;
		
		if (!this.timers.hasOwnProperty(timerID)) {
			throw new Error(
				'Timer with ID ' + timerID + ' does not exist. Unable to stop ' +
				'a timer that has not been created. Please call the .startTimer() ' +
				'method to start a new timer.'
			);
		}
		
		this.timers[timerID].stopTimer();
		return this.timers[timerID];
	},
	
	_calculateWhichWasFaster : function (benchmarkData) {
		//If method one duration was more than method 2 duration, return 2.
		if (benchmarkData.method_one.duration_ms > benchmarkData.method_two.duration_ms) {
			return 2;
		}
		//If method one duration was less than method 2 duration, return 1.
		if (benchmarkData.method_one.duration_ms < benchmarkData.method_two.duration_ms) {
			return 1;
		}
		
		//If method 1 and 2 durations were identical (or if something has gone terribly wrong),
		// return 0.
		return 0;
	},
	
	_calculateSlowerMultiple : function (benchmarkData) {
		var msFasterDuration, msSlowerDuration;
		
		var comparisonData = benchmarkData.comparison;
		var methodOneData = benchmarkData.method_one;
		var methodTwoData = benchmarkData.method_two;
		
		if (benchmarkData.comparison.which_was_faster === 0) {
			//If both were the same speed, multiple is 1.
			return 1;
		}
		
		msFasterDuration = (comparisonData.which_was_faster === 1) ? methodOneData.duration_ms : methodTwoData.duration_ms;
		msSlowerDuration = (comparisonData.which_was_faster === 1) ? methodTwoData.duration_ms : methodOneData.duration_ms;
		
		return (msSlowerDuration / msFasterDuration);
	},
	
	/**
	 *
	 * @param {string} [timerID="default"] The ID of the timer. Used for reference later.
	 * @private
	 * @constructor
	 */
	_Timer : function (timerID) {
		this.timer_id = timerID || 'default';
		this.start_ms = 0;
		this.stop_ms = 0;
		this.duration_ms = 0;
		this.duration_sec = 0;
		this.timer_running = false;
		
		this.startTimer = function () {
			this.start_ms = new GlideDateTime().getNumericValue();
			this.timer_running = true;
		};
		this.stopTimer = function () {
			if (!this.timer_running || !this.start_ms) {
				throw new Error(
					'Attempted to stop a timer that either isn\'t running, or that has ' +
					'an invalid start time.'
				);
			}
			
			this.stop_ms = new GlideDateTime().getNumericValue();
			this.duration_ms = (this.stop_ms - this.start_ms);
			this.duration_sec = (this.duration_ms / 1000);
			this.timer_running = false;
			
			return this;
		};
		
		//Getters
		this.getDurationMS = function () {
			return this.duration_ms;
		};
		this.getDurationSec = function () {
			return this.duration_sec;
		};
		this.getTimerID = function () {
			return this.timer_id;
		};
		
		//Setters
		this.setTimerID = function (timerID) {
			this.timer_id = timerID;
			return this;
		};
	},
	
	__example : function (iterations) {
		var benchmarkUtil, benchmarkData;
		var methodOne = function (args) {
			//Testing "=" query without setLimit
			var grAudit = new GlideRecord('sys_audit');
			grAudit.addEncodedQuery('newvalue=Random number: ' + args[0] + '^oldvalue=Random number: ' + args[1]);
			grAudit.query();
		};
		var methodTwo = function (args) {
			//Testing "CONTAINS" query without setLimit
			var grAudit = new GlideRecord('sys_audit');
			grAudit.addEncodedQuery('newvalueLIKE' + args[0] + '^oldvalueLIKE' + args[1]);
			grAudit.query();
		};
		iterations = iterations || 10;
		
		benchmarkUtil = new BenchmarkRunner();
		benchmarkData = benchmarkUtil.compareFunctions(
			methodOne,
			methodTwo,
			iterations,
			[271, 488], //Random #s in audit table that match a contrived record for this test
			true
		);
		
		return benchmarkUtil.printComparisonResults(benchmarkData, iterations);
	},
	
	__example2 : function () {
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
		
	},
	
	type : 'BenchmarkRunner'
};