(function executeRule(current, previous /*null when async*/) {
		
		// Chris E; 4 Oct 2019
		// If child enhancement(s) of a project originated from a demand record, set the enhancement parent to NULL from project record
		// so that the enhancement is not cascade deleted when it's parent project is deleted and is still available via the original demand record
		
		try {
			var enhGR = new GlideRecord('rm_enhancement');
			enhGR.addQuery('parent', current.getValue('sys_id'));
			enhGR.query();
			while(enhGR.next()){
				enhGR.setValue('parent', 'NULL');
				enhGR.update();
			}
		} catch (e){
			if(gs.isInteractive() && gs.hasRole('admin')){
				gs.addInfoMessage('Preserve enhancement on delete - '+ e.message);
			}
			gs.error(e.message);
		}
		
	})(current, previous);
