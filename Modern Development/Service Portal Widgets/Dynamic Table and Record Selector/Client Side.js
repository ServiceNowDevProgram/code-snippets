api.controller=function($scope, $http, spUtil, $rootScope, $timeout, spModal) {
	/* widget controller */
	var c = this;

	// Initialize scope variables
	$scope.tablename = {
		displayValue: '',
		value: '',
		name: 'tablename'
	};
	$scope.record = {
		displayValue: '',
		value: '',
		name: 'record'
	};
	$scope.selectedTable = '';
	$scope.TableSysId = '';

	// Handle field changes (table/record)
	$scope.$on("field.change", function(evt, parms) {
		if (parms.field.name === 'tablename') {
			// Get sys_id of selected table → fetch actual table name & label
			var sysId = parms.newValue;
			var url = '/api/now/table/sys_db_object/' + sysId + '?sysparm_fields=name,label';
			$http.get(url).then(function(res) {
				if (res.data.result) {
					$scope.selectedTable = res.data.result.name;
					$scope.selectedTableLabel = res.data.result.label;
					c.getDisplayField($scope.selectedTable, sysId); // fetch display field
				}
			});
		} else if (parms.field.name === 'record') {
			// Save selected record sys_id
			$scope.TableSysId = parms.newValue;
		}
	});

	// Get display field for a table (recursive if needed)
	c.getDisplayField = function(tableName, tablesysId) {
		var url = '/api/now/table/sys_dictionary' +
				'?sysparm_query=name=' + tableName + '^display=true' +
				'&sysparm_fields=element' +
				'&sysparm_limit=1';

		$http.get(url).then(function(response) {
			if (response.data.result && response.data.result.length > 0) {
				// Found display field
				$scope.recorddisplayValue = response.data.result[0].element;
			} else {
				// Check parent table
				var parentsysIdUrl = '/api/now/table/sys_db_object/' + tablesysId + '?sysparm_fields=super_class';
				$http.get(parentsysIdUrl).then(function(parentRes) {
					var parentTable = parentRes.data.result.super_class.value;

					if (!parentTable) {
						// No parent - fallback checks
						var nameCheckUrl = '/api/now/table/sys_dictionary' +
								'?sysparm_query=name=' + tableName + '^element=name' +
								'&sysparm_fields=element&sysparm_limit=1';

						$http.get(nameCheckUrl).then(function(nameRes) {
							if (nameRes.status == 200) {
								$scope.recorddisplayValue = 'name';
							} else {
								var numberCheckUrl = '/api/now/table/sys_dictionary' +
										'?sysparm_query=name=' + tableName + '^element=number' +
										'&sysparm_fields=element&sysparm_limit=1';

								$http.get(numberCheckUrl).then(function(numberRes) {
									if (numberRes.status == 200) {
										$scope.recorddisplayValue = 'number';
									} else {
										$scope.recorddisplayValue = 'sys_id'; // Final fallback
									}
								});
							}
						});

					} else {
						// Parent exists - recurse
						var parentNameUrl = '/api/now/table/sys_db_object/' + parentTable + '?sysparm_fields=name';
						$http.get(parentNameUrl).then(function(parentResname) {
							var parentTableName = parentResname.data.result.name;
							c.getDisplayField(parentTableName, parentTable); // recursive lookup
						});
					}
				});
			}
		}, function(error) {
			spModal.alert("Error fetching display field: " + error);
		});
	};

};
