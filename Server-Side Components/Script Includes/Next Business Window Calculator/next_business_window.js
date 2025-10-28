var NextBusinessWindow = Class.create();
NextBusinessWindow.prototype = (function () {
	// Configuration
	var DEFAULT_SCHEDULE_SYS_ID = ''; // optional fallback schedule sys_id (cmn_schedule)
	var DEFAULT_TZ = 'Europe/London';
	var MAX_SEGMENTS = 1000; // safety guard

	// Helpers
	function _toGdt(input) {
		if (input instanceof GlideDateTime) return input;
		var g = new GlideDateTime();
		if (input) g.setDisplayValue(input);
		return g;
	}
	function _getSchedule(scheduleSysId) {
		var sch = new GlideSchedule();
		if (scheduleSysId) sch.load(scheduleSysId);
		else if (DEFAULT_SCHEDULE_SYS_ID) sch.load(DEFAULT_SCHEDULE_SYS_ID);
		else throw new Error('No schedule sys_id supplied and no default configured.');
		return sch;
	}
	function _setTz(gdt, tz) { if (tz) gdt.setTZ(tz); return gdt; }

	return {
		initialize: function () {},

		/**
		 * Add working minutes across a GlideSchedule.
		 * @param {String|GlideDateTime} start
		 * @param {Number} minutes
		 * @param {String} scheduleSysId
		 * @param {String} [timeZone] IANA name, e.g. "Europe/London"
		 * @returns {{endGdt: GlideDateTime, consumedMinutes: number, segments: Array}}
		 */
		addWorkingMinutes: function (start, minutes, scheduleSysId, timeZone) {
			if (!minutes || minutes < 0) throw new Error('Minutes must be a positive integer.');
			var tz = timeZone || DEFAULT_TZ;
			var sch = _getSchedule(scheduleSysId);

			var cursor = _toGdt(start);
			_setTz(cursor, tz);

			// If not in schedule, jump to the next working start
			if (!sch.isInSchedule(cursor)) {
				var nextStart = sch.getNextStartTime(cursor);
				if (!nextStart) throw new Error('No next working period found from start time.');
				cursor = nextStart;
			}

			var remaining = parseInt(minutes, 10);
			var segments = [];
			var guard = 0;

			while (remaining > 0) {
				if (guard++ > MAX_SEGMENTS) throw new Error('Exceeded max segments; check schedule/inputs.');

				var segEnd = sch.getNextEndTime(cursor);
				if (!segEnd) throw new Error('Schedule has no next end time; check configuration.');

				var available = Math.ceil((segEnd.getNumericValue() - cursor.getNumericValue()) / (60 * 1000)); // minutes

				if (remaining <= available) {
					var end = new GlideDateTime(cursor);
					end.addSeconds(remaining * 60);
					segments.push({ segmentStart: new GlideDateTime(cursor), segmentEnd: new GlideDateTime(end), consumed: remaining });
					return { endGdt: end, consumedMinutes: minutes, segments: segments };
				}

				// consume full segment
				segments.push({ segmentStart: new GlideDateTime(cursor), segmentEnd: new GlideDateTime(segEnd), consumed: available });
				remaining -= available;

				var nextStart = sch.getNextStartTime(segEnd);
				if (!nextStart) throw new Error('No subsequent working segment found.');
				cursor = nextStart;
			}

			return { endGdt: new GlideDateTime(cursor), consumedMinutes: minutes, segments: segments };
		}
	};
})();
