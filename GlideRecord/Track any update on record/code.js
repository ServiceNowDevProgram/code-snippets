(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	for (var x in current){
		if(x!='comments'&&x!='sys_mod_count'&&x!='sys_updated_by'&&x!='sys_updated_on'){
			if (current[x] != previous[x]) {
					var currVal=current[x].getDisplayValue();
				if(current[x].getDisplayValue()==''){
					currVal='empty';
				}
				if(x=='description'){
					current.comments=current[x].getLabel() +' has been updated to ' +currVal;
				}
				else{
					var prev=previous[x].getDisplayValue();
					if(previous[x].getDisplayValue()==''){
						prev='empty';
					}
					current.comments=current[x].getLabel() +' has been updated to ' +currVal+' from '+prev;
				}
			}
		}		
	}
})(current, previous);
