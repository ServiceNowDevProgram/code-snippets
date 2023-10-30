/*
	This script submits the Pre-created discovery schedules (On Demand schedules) but it honours
	pre-configured days to be skipped at the begining of the month and days at the end of the month.
	
	It also honours the pre-configured times that discovery should be skipped.
	
	Configurations required:
	
	- Standard discovery schedules with Run (On Demand)
	- The following sys_properties needs to be configured
		> VF.Discovery.BOM.DaysToFreeze
		> VF.Discovery.EOM.DaysToFreeze
		> VF.Discovery.Freeze.StartTime
		> VF.Discovery.Freeze.EndTime
*/

var VF_DiscoveryScheduleWithFreezePeriod = Class.create();
VF_DiscoveryScheduleWithFreezePeriod.prototype = {

    // Setting to true will generate a log in System Logs > All
    _log: false,

    // Prefix to be appended to log files
    _logPrefix: 'VF: ',

    // Result to be returned
    _result: {
        scheduleStatusIds: [],
        success: false,
        message: ''
    },

    _msg: '',

    initialize: function (log) {
        this._log = log;
    },

	/**
 	* Reads the discovery records where type is 'On Demand'
 	* Checks the discovery freeze values and calculates if discovery to be submitted or not
 	* Returns the result including was it successful, the message (if any error or validations) and
 	* discovery schedule Ids (if schedules were submitted)
 	*
 	* @param {GlideDateTime} gdt : Current date as GlideDateTime - Just injecting it for ease of testing
    */
    process: function (gdt) {

        try {

            if (!gdt) {
                throw 'Current date as GlideDateTime is required.';
            }

            var validation = this.isOutsideFreezePeriodAndTime(gdt);
            if (!validation.success) {
                // Its discovery freeze period, so update the result and log if needed
                this._msg = validation.message;
                this._logIfApplicable(this._msg);
                return this._setResult(false, this._msg, null);
            }

            // **** Get all the schedules that are configured to run 'On Demand' ****
            var discoverySchedules = new GlideRecord('discovery_schedule');
            discoverySchedules.addQuery('disco_run_type', 'on_demand');
            discoverySchedules.query();
            var totalSchedules = discoverySchedules.getRowCount();

            if (totalSchedules > 0) {
                // Some schedules are found, verify if it is not freeze period
                this._logIfApplicable('Discovery Schedules found: ' + totalSchedules);

                // **** Submit the discovieries and hold the status Id ****
                while (discoverySchedules.next()) {
                    this._logIfApplicable("Processing discovery schedule: " + discoverySchedules.getValue('name'));
                    var disco = new Discovery();
                    var statusId = disco.discoverNow(discoverySchedules);
                    this._result.scheduleStatusIds.push(statusId);
                    this._logIfApplicable("Discovery StatusId: " + statusId);
                }

            } else {
                // No schedules found, update the result and log if needed
                this._msg = 'No discovery schedule records where found.';
                this._logIfApplicable(this._msg);
                return this._setResult(false, this._msg, null);
            }

            // If we are here and thing are all good, return the success result
            return this._setResult(true, '', this._result.scheduleStatusIds);

        } catch (err) {
            this._msg = this._logPrefix + JSON.stringify(err);
            gs.error(this._msg);
            return this._setResult(false, this._msg, null);
        }

    },

    /**
    * Function that just validates if the date is outside the freeze period or not
    * Can be used in UI Actions etc.
 	*
 	* @param {GlideDateTime} gdt : Current date as GlideDateTime - Just injecting it for ease of testing
    */
    isOutsideFreezePeriodAndTime: function (gdt) {

        if (!gdt) {
            throw 'Current date as GlideDateTime is required.';
        }

        var result = {
            success: false,
            message: 'It is discovery freeze period and therefore no discovery will be submitted.'
        };

        try {
            // Number of days in current month
            var daysOfTheMonth = gdt.getDaysInMonthLocalTime();

            // Validate system properties are configured and having valid values ****
            var sysProps = this._readAndValidateSystemProperties(daysOfTheMonth);

            var dayOfMonth = gdt.getDayOfMonthLocalTime();

            // Calculate if its outside the freeze period
            if (this._isOutsideFreezeDate(daysOfTheMonth, dayOfMonth, sysProps.noOfDaysToFreezeBOM, sysProps.noOfDaysToFreezeEOM)) {

                if (this._isOutsideFreezeTime(sysProps.freezeStartTime, sysProps.freezeEndTime)) {
                    result.success = true;
                    result.message = '';
                } else {
                    result.message = 'It is discovery freeze time and therefore no discovery will be submitted.';
                }
            }

        } catch (err) {
            this._msg = this._logPrefix + JSON.stringify(err);
            gs.error(this._msg);
            result.message = this._msg;
        }

        return result;
    },

	/**
    * Validates if the time is outside the pre-configured freeze time or not i.e. the time is smaller than start and greater than end times
 	*
 	* @param {string} startTime: Freeze start time
	* @param {string} endTime: Freeze end time
    */
    _isOutsideFreezeTime: function (startTime, endTime) {

        var currentDateTime = new GlideDateTime();
        var freezeStartTime = this._getDateTime(currentDateTime, startTime);
        var freezeEndTime = this._getDateTime(currentDateTime, endTime);

        if (currentDateTime.getLocalTime() > freezeStartTime.value && currentDateTime.getLocalTime() < freezeEndTime) {
            return false;
        } else {
            return true;
        }
    },

	/**
    * Returns GlideDateTime based on string time and current date
 	*
 	* @param {GlideDateTime} currentDateTime: base date time
	* @param {string} time: time string
    */
    _getDateTime: function (currentDateTime, time) {
        var baseDateTime = currentDateTime.getLocalTime().toString();
        var baseDate = baseDateTime.split(" ")[0];
        var variableTime = new GlideDateTime(baseDate + ' ' + time);
        return variableTime;
    },


    /**
    * Determines if the date is outside the freeze period. Returns true if outside freeze period.
    *
    * @param {number} daysOfTheMonth : Total days of the month based on GlideDateTime for current date
    * @param {number} currentDayOfMonth : Current day of the month based on GlideDateTime for current date
    * @param {number} noOfDaysToFreezeBOM : Total days to freeze discovery schedule at the begining of the month
    * @param {number} noOfDaysToFreezeEOM : Total days to freeze discovery schedule at the end of the month
    */
    _isOutsideFreezeDate: function (daysOfTheMonth, currentDayOfMonth, noOfDaysToFreezeBOM, noOfDaysToFreezeEOM) {

        var startDayOfDiscovery = noOfDaysToFreezeBOM;
        var endDayOfDiscovery = daysOfTheMonth - noOfDaysToFreezeEOM;

        // For the EOM should be inclusive e.g. 31-2=29 but should include 29 as discovery day
        if (currentDayOfMonth > startDayOfDiscovery && currentDayOfMonth <= endDayOfDiscovery) {
            return true;
        }

        return false;
    },

    /**
    * Helper to set the result to be returned
    *
    * @param {boolean} successOrFailure : was it successful?
    * @param {string} message : any message in case of error or validations
    * @param {array} statusIds : discovery status ids if schedule was submitted successfuly
    */
    _setResult: function (successOrFailure, message, statusIds) {
        this._result.success = successOrFailure;
        this._result.message = message;
        this._result.scheduleStatusIds = statusIds;

        return this._result;
    },

    /**
    * Reads the system properties and applies the appropriate validations
    * Throws exception if values are not valid.
    *
    * Returns an object containing no of days to freeze BOM and  no of days to freeze EOM
    *
    * @param {number} daysOfMonth : Total days of the month based on GlideDateTime for the date
    */
    _readAndValidateSystemProperties: function (daysOfMonth) {
        var noOfDaysToFreezeBOM = parseInt(gs.getProperty('VF.Discovery.BOM.DaysToFreeze'));
        var noOfDaysToFreezeEOM = parseInt(gs.getProperty('VF.Discovery.EOM.DaysToFreeze'));

        if (noOfDaysToFreezeBOM < 0) {
            throw 'Please provide a valid value for the System Property: VF.Discovery.BOM.DaysToFreeze';
        }

        if (noOfDaysToFreezeEOM < 0) {
            throw 'Please provide a valid value for the System Property: VF.Discovery.EOM.DaysToFreeze';
        }

        if (noOfDaysToFreezeBOM === 0 && noOfDaysToFreezeEOM === 0) {
            throw 'Please configure one of the System Properties either VF.Discovery.EOM.DaysToFreeze or VF.Discovery.BOM.DaysToFreeze';
        }

        if (daysOfMonth > 0 && (noOfDaysToFreezeBOM > 0 || noOfDaysToFreezeEOM > 0)) {
            if (noOfDaysToFreezeBOM + noOfDaysToFreezeEOM >= daysOfMonth) {
                throw 'Please configure the System Properties VF.Discovery.EOM.DaysToFreeze and VF.Discovery.BOM.DaysToFreeze to have valid values. This schedule will not run as the sum of days to freeze at BOM and EOM are greater than total days of the month!';
            }
        }

        // read start and end times
        var freezeStartTime = gs.getProperty('VF.Discovery.Freeze.StartTime');
        var freezeEndTime = gs.getProperty('VF.Discovery.Freeze.EndTime');

        if (!freezeStartTime || !freezeEndTime) {
            throw 'Please configure a valid discovery freeze start time and end time in sys_properties e.g. VF.Discovery.Freeze.StartTime and VF.Discovery.Freeze.EndTime';
        }

        return {
            noOfDaysToFreezeBOM: noOfDaysToFreezeBOM,
            noOfDaysToFreezeEOM: noOfDaysToFreezeEOM,
            freezeStartTime: freezeStartTime,
            freezeEndTime: freezeEndTime
        };
    },

    /**
    * Adds an info log using GlideSystem. Prepends a prefix as needed.
    * Checks the flag if log is needed or not
    *
    * @param {string} message : message to be logged
    */
    _logIfApplicable: function (message) {

        if (this._log) {
            gs.info(this._logPrefix + message);
        }
    },


    type: 'VF_DiscoveryScheduleWithFreezePeriod'
};