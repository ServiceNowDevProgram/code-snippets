var BusinessTimeUtils = Class.create();
BusinessTimeUtils.prototype = {
  initialize: function() {},

  /**
   * Add working hours to a start date, respecting schedule and holidays.
   * @param {String} scheduleSysId - sys_id of the GlideSchedule
   * @param {Number} hoursToAdd - working hours to add (can be fractional)
   * @param {GlideDateTime|String} startGdt - start time; if string, must be ISO/Glide-friendly
   * @param {String} [timeZone] - optional IANA TZ, else schedule/instance TZ
   * @returns {Object} { ok:Boolean, due:GlideDateTime|null, minutesAdded:Number, message:String }
   */
  addWorkingHours: function(scheduleSysId, hoursToAdd, startGdt, timeZone) {
    var result = { ok: false, due: null, minutesAdded: 0, message: '' };
    try {
      this._assertSchedule(scheduleSysId);
      var start = this._toGdt(startGdt);
      var msToAdd = Math.round(Number(hoursToAdd) * 60 * 60 * 1000);
      if (!isFinite(msToAdd) || msToAdd <= 0) {
        result.message = 'hoursToAdd must be > 0';
        return result;
      }

      var sched = new GlideSchedule(scheduleSysId, timeZone || '');
      var due = sched.add(new GlideDateTime(start), msToAdd); // returns GlideDateTime

      // How many working minutes were added according to the schedule
      var mins = Math.round(sched.duration(start, due) / 60000);

      result.ok = true;
      result.due = due;
      result.minutesAdded = mins;
      return result;
    } catch (e) {
      result.message = String(e);
      return result;
    }
  },

  /**
   * Calculate working minutes between two times using the schedule.
   * @returns {Object} { ok:Boolean, minutes:Number, message:String }
   */
  workingMinutesBetween: function(scheduleSysId, startGdt, endGdt, timeZone) {
    var out = { ok: false, minutes: 0, message: '' };
    try {
      this._assertSchedule(scheduleSysId);
      var start = this._toGdt(startGdt);
      var end = this._toGdt(endGdt);
      if (start.after(end)) {
        out.message = 'start must be <= end';
        return out;
      }
      var sched = new GlideSchedule(scheduleSysId, timeZone || '');
      out.minutes = Math.round(sched.duration(start, end) / 60000);
      out.ok = true;
      return out;
    } catch (e) {
      out.message = String(e);
      return out;
    }
  },

  /**
   * Find the next time that is inside the schedule window at or after fromGdt.
   * @returns {Object} { ok:Boolean, nextOpen:GlideDateTime|null, message:String }
   */
  nextOpen: function(scheduleSysId, fromGdt, timeZone) {
    var out = { ok: false, nextOpen: null, message: '' };
    try {
      this._assertSchedule(scheduleSysId);
      var from = this._toGdt(fromGdt);
      var sched = new GlideSchedule(scheduleSysId, timeZone || '');

      // If already inside schedule, return the same timestamp
      if (sched.isInSchedule(from)) {
        out.ok = true;
        out.nextOpen = new GlideDateTime(from);
        return out;
      }

      // Move forward minute by minute until we hit an in-schedule time, with a sane cap
      var probe = new GlideDateTime(from);
      var limitMinutes = 24 * 60 * 30; // cap search to 30 days
      for (var i = 0; i < limitMinutes; i++) {
        probe.addSecondsUTC(60);
        if (sched.isInSchedule(probe)) {
          out.ok = true;
          out.nextOpen = new GlideDateTime(probe);
          return out;
        }
      }
      out.message = 'No open window found within 30 days';
      return out;
    } catch (e) {
      out.message = String(e);
      return out;
    }
  },

  /**
   * Check if a time is inside the schedule.
   * @returns {Object} { ok:Boolean, inSchedule:Boolean, message:String }
   */
  isInSchedule: function(scheduleSysId, whenGdt, timeZone) {
    var out = { ok: false, inSchedule: false, message: '' };
    try {
      this._assertSchedule(scheduleSysId);
      var when = this._toGdt(whenGdt);
      var sched = new GlideSchedule(scheduleSysId, timeZone || '');
      out.inSchedule = sched.isInSchedule(when);
      out.ok = true;
      return out;
    } catch (e) {
      out.message = String(e);
      return out;
    }
  },

  // ---------- helpers ----------

  _toGdt: function(val) {
    if (val instanceof GlideDateTime) return new GlideDateTime(val);
    if (typeof val === 'string' && val) return new GlideDateTime(val);
    if (!val) return new GlideDateTime(); // default now
    throw 'Unsupported datetime value';
  },

  _assertSchedule: function(sysId) {
    if (!sysId) throw 'scheduleSysId is required';
    var gr = new GlideRecord('cmn_schedule');
    if (!gr.get(sysId)) throw 'Schedule not found: ' + sysId;
  },

  type: 'BusinessTimeUtils'
};
