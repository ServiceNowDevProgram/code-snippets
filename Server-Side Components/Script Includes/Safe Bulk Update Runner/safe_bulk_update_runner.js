
var SafeBulkUpdateRunner = Class.create();
SafeBulkUpdateRunner.prototype = (function () {
	var DEFAULTS = {
		property_name: 'x_util.safe_bulk.last_id',
		table: 'incident',
		query: 'active=true',
		order_by: 'sys_id',
		chunk_size: 500,
		max_seconds: 40 // keep under typical script timeout
	};

	function _propGet(name, fallback) { var v = gs.getProperty(name, ''); return v || fallback || ''; }
	function _propSet(name, value) { gs.setProperty(name, value || ''); }
	function _gt(field, sysId) { return sysId ? field + '>' + sysId : ''; }
	function _now() { return new Date().getTime(); }
	function _scheduleNext(scriptIncludeName, methodName, args) {
		var so = new ScheduleOnce();
		so.schedule(scriptIncludeName, methodName, JSON.stringify(args || {}));
		gs.info('[SafeBulk] Scheduled next slice for ' + scriptIncludeName + '.' + methodName);
	}

	return {
		initialize: function () {},

		/**
		 * Run one slice then schedule the next.
		 * @param {Object} cfg
		 * @param {Function} perRecordFn function(gr) -> void
		 */
		runSlice: function (cfg, perRecordFn) {
			var c = Object.assign({}, DEFAULTS, cfg || {});
			if (typeof perRecordFn !== 'function') throw new Error('perRecordFn is required.');

			var start = _now();
			var lastId = _propGet(c.property_name, '');

			var gr = new GlideRecord(c.table);
			gr.addEncodedQuery(c.query);
			if (lastId) gr.addEncodedQuery(_gt(c.order_by, lastId));
			gr.orderBy(c.order_by);
			gr.setLimit(c.chunk_size);
			gr.query();

			var processed = 0;
			while (gr.next()) {
				perRecordFn(gr);
				lastId = String(gr.getUniqueValue());
				processed++;

				if ((_now() - start) / 1000 >= c.max_seconds) {
					gs.info('[SafeBulk] Timebox reached after ' + processed + ' records.');
					break;
				}
			}

			if (lastId) _propSet(c.property_name, lastId);

			if (processed === c.chunk_size || gr.hasNext()) {
				_scheduleNext('SafeBulkUpdateRunner', 'runSliceScheduled', { cfg: c });
			} else {
				gs.info('[SafeBulk] All done. Clearing checkpoint.');
				_propSet(c.property_name, '');
			}
		},

		/**
		 * Entry point for ScheduleOnce (stringified args).
		 */
		runSliceScheduled: function (jsonArgs) {
			var args = (typeof jsonArgs === 'string') ? JSON.parse(jsonArgs) : (jsonArgs || {});
			var cfg = args.cfg || {};
			// Example logic; replace with your own:
			this.runSlice(cfg, function (gr) {
				gr.setValue('u_backfilled', true);
				gr.update();
			});
		}
	};
})();
