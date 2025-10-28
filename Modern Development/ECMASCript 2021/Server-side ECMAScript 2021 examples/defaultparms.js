// Instead of having to check for included parameters in a function's body, we can do it directly in the parameters now.

//before
(function executeRule(current, previous /*null when async*/) {

	function add (x, y){
		if (y == null) y = 'nothing to see here';
		return x + '\n' + y;
	}
	
	current.work_notes = add(current.short_description);
	
})(current, previous);

//after
(function executeRule(current, previous /*null when async*/) {

	function add (x, y = 'nothing to see here'){
		return x + '\n' + y;
	}
	
	current.work_notes = add(current.short_description);
	
})(current, previous);