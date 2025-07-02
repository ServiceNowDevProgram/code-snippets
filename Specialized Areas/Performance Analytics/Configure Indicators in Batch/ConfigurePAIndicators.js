(function () {

	// The only time series we want to keep (makes data collection jobs run faster)
	var CONST_PA_TIME_SERIES_7D_AVG_SYSID = '9ef05051d7001100ba986f14ce610372';
	
	// Cache all the aggregates (Time Series) to avoid querying them for each indicator
	
	var paAggregatesArr = [];
	var grPaAggregate = new GlideRecord('pa_aggregates');
	grPaAggregate.query();
	while (grPaAggregate.next()) {
		paAggregatesArr.push(String(grPaAggregate.getUniqueValue()));
	}
	
	// Get through all the indicators and configure them like we want
	
	var grIndicator = new GlideRecord('pa_indicators');
	grIndicator.addQuery('name', 'STARTSWITH', 'Whatever you need '); // **** Update your query here ****
	grIndicator.orderBy('name');
	grIndicator.query();
	
	while (grIndicator.next()) {
		
		// Depending on the unit type, set proper attributes
		
		if (grIndicator.unit.name.toString() == '%') {
			grIndicator.excluded_statistics.setValue('Sum');
			grIndicator.precision.setValue(1);
            grIndicator.direction.setValue('3');
		} else if (grIndicator.unit.name.toString() == '#') {
			grIndicator.excluded_statistics.setValue('');
			grIndicator.precision.setValue(0);
            grIndicator.aggregate.setValue('1');			
		}
		
		// Set standard values for other attributes 

		grIndicator.key.setValue(false);
		grIndicator.value_when_nil.setValue('');
		
		// Set data retention periods for scores and collected records (for automated indicators only)
		
		if (grIndicator.type == 1) {
			grIndicator.override_periods.setValue(true);
			grIndicator.score_periods.setValue(90);		
			grIndicator.snapshot_periods.setValue(15);		
		}
			
		// Only keep the 7d AVG time series, exclude all the other ones
		
		var grTimeSeriesExclusionDel = new GlideRecord('pa_indicator_aggregate_excl');
		grTimeSeriesExclusionDel.addQuery('indicator', grIndicator.getUniqueValue());
		grTimeSeriesExclusionDel.deleteMultiple();
				
		for (var i = 0; i < paAggregatesArr.length; i++) {
		
			// We only keey 7d AVG
			if (paAggregatesArr[i] != CONST_PA_TIME_SERIES_7D_AVG_SYSID) {
				var grTimeSeriesExclusionAdd = new GlideRecord('pa_indicator_aggregate_excl');
				grTimeSeriesExclusionAdd.newRecord();
				grTimeSeriesExclusionAdd.setValue('indicator', grIndicator.getUniqueValue());
				grTimeSeriesExclusionAdd.setValue('aggregate', paAggregatesArr[i]);
				grTimeSeriesExclusionAdd.insert();
			}

		}

		// Update the record
		grIndicator.update();
		
	}

})();
