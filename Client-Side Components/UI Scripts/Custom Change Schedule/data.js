angular.module("sn.chg_soc.data", [])
	.service("dataService", ["$http", "$q", "$window", "i18n", "urlService", "ganttChart", "durationFormatter", "SOC", "$filter", function($http, $q, $window, i18n, urlService, ganttChart, durationFormatter, SOC, $filter) {
		var dataService = this;

		dataService.more = false;
		dataService.count = 0;
		dataService.child_table = {};
		dataService.definition = {};
		dataService.style = {
			chg_soc_style_rule: {},
			chg_soc_definition_style_rule: {},
			chg_soc_def_child_style_rule: {},
			style_sheet: ""
		};
		dataService.tasks = {
			data: [],
			links: []
		};
		dataService.allRecords = {};

		function isValidDate(date) {
			if (Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime()))
				return true;
			return false;
		}

		function buildFields(record, selectedFieldsList, tableMeta) {
			var result = [];
			if (!selectedFieldsList)
				return result;
			var selectedFields = selectedFieldsList.split(",");
			selectedFields.forEach(function(fieldName) {
				if (fieldName && tableMeta[fieldName])
					result.push({
						column_name: fieldName,
						label: tableMeta[fieldName].label,
						display_value: record[fieldName].display_value,
						value: record[fieldName].value,
					});
			});
			return result;
		}

		function buildRecord(record, chgSocDef, tableMeta, styleRule, scheduleWindow) {
			var ganttUtil = ganttChart.getGantt(urlService.socId);
			var startDate = ganttUtil.date.parseDate(record[chgSocDef.start_date_field.value].display_value_internal, "xml_date");
			var endDate = ganttUtil.date.parseDate(record[chgSocDef.end_date_field.value].display_value_internal, "xml_date");
			// Check start/end dates are valid before adding the task to gantt chart
			if (!isValidDate(startDate) || !isValidDate(endDate))
				return;

			var recordEvent = {
				id: record.sys_id ? record.sys_id.value : "",
				text: record.number ? record.number.display_value : "",
				number: record.number ? record.number.display_value : "",
				chg_soc_def: chgSocDef.sys_id.value,
				config_item: record.cmdb_ci ? record.cmdb_ci.display_value : "",
				start_date: startDate,
				end_date: endDate,
				dur_display: durationFormatter.buildDurationDisplay(startDate, endDate),
				order: 0,
				progress: 0,
				table: record.sys_class_name ? record.sys_class_name.value : chgSocDef.table_name.value,
				left_fields: buildFields(record, chgSocDef.popover_left_col_fields.value, tableMeta),
				right_fields: buildFields(record, chgSocDef.popover_right_col_fields.value, tableMeta),
				record: record,
				blackout_spans: [],
				maint_spans: [],
				sys_id: record.sys_id ? record.sys_id.value : "",
				short_description: record.short_description ? record.short_description.display_value : "",
				__visible: true
			};

			if (styleRule && styleRule.sys_id)
				recordEvent.style_class = SOC.STYLE_PREFIX + styleRule.sys_id;

			if (scheduleWindow) {
				if (chgSocDef.show_maintenance.value)
					angular.forEach(scheduleWindow.maintenance, function (schedule) {
						Array.prototype.push.apply(recordEvent.maint_spans, schedule.spans);
					});
				if (chgSocDef.show_blackout.value)
					angular.forEach(scheduleWindow.blackout, function (schedule) {
						Array.prototype.push.apply(recordEvent.blackout_spans, schedule.spans);
					});
			} else {
				recordEvent.id = chgSocDef.sys_id.value + "_" + recordEvent.id;
				recordEvent.parent = record[chgSocDef.reference_field.value].value;
			}

			dataService.allRecords[recordEvent.id] = {
				style_rule: styleRule,
				sys_id: record.sys_id ? record.sys_id.value : "",
				table_name: record.sys_class_name ? record.sys_class_name.value : chgSocDef.table_name.value,
				chg_soc_def: chgSocDef.sys_id.value
			};

			return recordEvent;
		}

		function buildItem(result, item) {
			// Build change_request record
			var record = buildRecord(result[item.table_name][item.sys_id], result.chg_soc_definition, result[item.table_name].__table_meta, item.style, item.schedule_window);
			if (!record)
				return;

			dataService.tasks.data.push(record);

			// Build related tasks
			if (item.related)
				for (var childSocDefId in item.related) {
					var childRecords = item.related[childSocDefId];
					for (var i = 0; i < childRecords.length; i++) {
						var childRecord = buildRecord(result[childRecords[i].table_name][childRecords[i].sys_id], result.chg_soc_definition.__child[childSocDefId], result[childRecords[i].table_name].__table_meta, childRecords[i].style);
						if (childRecord)
							dataService.tasks.data.push(childRecord);
					}
				}
		}

		dataService.buildData = function(result) {
			if (!result)
				return;

			dataService.more = result.__more;
			dataService.count = result.__change_count;

			// Start with the definition object
			if (result.chg_soc_definition)
				dataService.definition = result.chg_soc_definition;

			// Ordered change requests with style and related records
			if (result.__struct)
				for (var i = 0; i < result.__struct.length; i++)
					buildItem(result, result.__struct[i]);

			// Find all child tables
			for (var table in result)
				if (result[table].__has_children)
					dataService.child_table[table] = result[table].__table_meta;

			// Set style rules and style sheet to the model
			dataService.style.chg_soc_style_rule = result.chg_soc_style_rule;
			dataService.style.chg_soc_definition_style_rule = result.chg_soc_definition_style_rule;
			dataService.style.chg_soc_def_child_style_rule = result.chg_soc_def_child_style_rule;
			dataService.style.style_sheet = result._css;
		};

		dataService.addData = function(result) {
			dataService.more = result.__more;
			dataService.count = result.__change_count;

			if (result.__struct)
				for (var i = 0; i < result.__struct.length; i++)
					buildItem(result, result.__struct[i]);

			for (var table in result)
				if (result[table].__has_children)
					dataService.child_table[table] = result[table].__table_meta;
		};

		dataService.initPage = function(chgSocDefId, condition) {
			var deferred = $q.defer();
			var url = SOC.GET_CHANGE_SCHEDULE + chgSocDefId;
			var config = {};
			config.params = {
				sysparm_ck: $window.g_ck
			};
			if (condition)
				config.params.condition = condition;
			$http.get(url, config).then(function(response){
				deferred.resolve(dataService.buildData(response.data.result));
			}, function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		dataService.getChanges = function() {
			var deferred = $q.defer();
			var url = SOC.GET_CHANGE_SCHEDULE + dataService.definition.sys_id.value;
			var config = {};
			config.params = {
				sysparm_ck: $window.g_ck,
				count: dataService.count
			};
			if (dataService.definition.condition.dryRun)
				config.params.condition = dataService.definition.condition.value;

			$http.get(url, config).then(function(response){
				deferred.resolve(dataService.addData(response.data.result));
			}, function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		dataService.getChildren = function(parentId) {
			var res = $filter("filter")(dataService.tasks.data, function(task) {
				return task.parent === parentId;
			});
			return res;
		};

		dataService.destroyData = function() {
			dataService.more = false;
			dataService.count = 0;
			dataService.child_table = {};
			dataService.definition = {};
			dataService.style = {
				chg_soc_style_rule: {},
				chg_soc_definition_style_rule: {},
				chg_soc_def_child_style_rule: {},
				style_sheet: ""
			};
			dataService.tasks = {
				data: [],
				links: []
			};
			dataService.allRecords = {};
		};

		dataService.parseQuery = function(condition) {
			condition = condition + "";
			var deferred = $q.defer();
			var url = SOC.GET_PARSE_QUERY + condition;
			var config = {};
			config.params = {};
			config.params.sysparm_ck = $window.g_ck;

			$http.get(url, config).then(function(response) {
				deferred.resolve(response.data.result);
			}, function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		function checkSecurityObject() {
			return dataService.definition && dataService.definition.__security;
		}

		dataService.canCreate = function() {
			if (checkSecurityObject() && dataService.definition.__security.canCreate)
				return dataService.definition.__security.canCreate;
			return false;
		};

		dataService.canRead = function() {
			if (checkSecurityObject() && dataService.definition.__security.canRead)
				return dataService.definition.__security.canRead;
			return false;
		};

		dataService.canWrite = function() {
			if (checkSecurityObject() && dataService.definition.__security.canWrite)
				return dataService.definition.__security.canWrite;
			return false;
		};

		dataService.canDelete = function() {
			if (checkSecurityObject() && dataService.definition.__security.canDelete)
				return dataService.definition.__security.canDelete;
			return false;
		};

		dataService.trackEvent = function(source) {
			if ($window.GlideWebAnalytics && $window.GlideWebAnalytics.trackEvent)
				$window.GlideWebAnalytics.trackEvent('com.snc.change_management.soc', 'Change Schedules', source, 0, 0);
		};
	}]);
