(function executeRule(current, previous /*null when async*/) {

	current.locked_out = !current.active; 

})(current, previous);
