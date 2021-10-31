updateFiscalPeriods();
	

	function updateFiscalPeriods() {
	

	    try {
	

	        // endoded query that defines the fiscal year/s to update, as generated in each instance sys_id will always be different
	        var fpQuery = 'fiscal_year=91dbfea31bdf3010dddda82c274bcbd6';
	        
	        // the short month names to append to the end of the month period names, should be ordered from first month in fiscal year to last
	        var orderedMonth = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];
	        
	        // the first end year in the set of fiscal periods being updated (e.g if fy23 created then this should be set to 24) set to 0 if not wanting to augment the year value included in the name
	        var startAdditionalYear = 22;
	        
	        // number of fiscal period records generated per fiscal year plus one - used to increment the year
	        var fiscalPeriodRecordsPerYear = 18;
	        
	        
	        var monthIncrementer = 0,
	            yearIncrementer  = 0,
	            monthPrefix      = "M0";
	        var formattedMonth, currName, newName;
	        

	        var fpGR = new GlideRecord('fiscal_period');
	        fpGR.addEncodedQuery(fpQuery);
	        fpGR.orderBy('name');
	        fpGR.query();
	        while (fpGR.next()) {
	            // reset/increment variables for each fiscal period record iterated through
	            var newMonth = "";
	            newName = "";
	            yearIncrementer++;
	

	            // if there are 18 fiscal periods per year then this resets variables to iterate through new year
	            if (yearIncrementer == fiscalPeriodRecordsPerYear) {
	                if (startAdditionalYear > 0) {
	                    startAdditionalYear++;
	                }
	                yearIncrementer = 0;
	                monthIncrementer = 0;
	            }
            
	
	            // get the current period name
	            currName = fpGR.getValue('name');
            
				
		          // if we are trying to add a string that already exists in current fiscal period, abort, abort
	            if (currName.indexOf(orderedMonth[monthIncrementer]) >= 0 && orderedMonth.length > 0 || currName.indexOf(startAdditionalYear) >= 0 && startAdditionalYear > 0) {
			            gs.info('ERROR - Current name already includes month short name OR additional start year');
			            return;
	            }
	

	            // if a month then add the corresponding short month name to newMonth variable and the string being added doesn't already exist in the current name
	            if (fpGR.getValue('fiscal_type') == 'month' && orderedMonth.length > 0) {
	                newMonth = " " + orderedMonth[monthIncrementer];
	                monthIncrementer++;
		          }
	

	

	            // if adding year values to name then add the year value and additional year doesn't already exist in current value, if not just set the new name to the current name
	            if (startAdditionalYear > 0) {
					        newName = currName.slice(0, 2) + startAdditionalYear + "-" + currName.slice(2, 4) + currName.slice(4);
	            } else newName = currName;
	


	            // if adding month short names AND adding year then just append the month to the already built new name from above
	            // if not adding year then add month to the current name
	            if (newMonth) {
	                if (startAdditionalYear > 0) {
	                    newName += newMonth;
	                } else newName = currName + newMonth;
	            }
	


	            // commit and save the new name to the database
	            fpGR.setValue('name', newName);
	            gs.info('If newName correct uncomment update code - ' + newName);
	            //fpGR.update();
	        }
	

	    } catch (e) {
	        gs.error(e.message);
	    }
	}
