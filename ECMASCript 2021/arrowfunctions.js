// How many times have we googled "how to do ____ in JavaScript?" and the top result was a StackOverflow answer that utilized arrow functions? Arrow functions are a compact alternative to traditional function expressions. Combined with other new features, there are so many use-cases for arrow functions (like quickly reordering arrays of objects!).

//before
(function executeRule(current, previous /*null when async*/) {

	var sd = current.short_description;
	var d = current.description;
	
	function addDescriptions(x, y){
		return x + '\n' + y;
	}
	
	current.work_notes = addDescriptions(sd, d);
	
})(current, previous);

//after
(function executeRule(current, previous /*null when async*/) {

	var sd = current.short_description;
	var d = current.description;
	
	let addDescriptions = (x, y) => x + '\n'+ y; //one line!
	
	current.work_notes = addDescriptions(sd, d);
	
})(current, previous);