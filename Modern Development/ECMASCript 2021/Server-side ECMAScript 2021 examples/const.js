// This was actually available previously but would display an error to you when using it, despite allowing you to save. Almost everything else related to ECMAScript 6 and up would not allow you to save your record at all.

// `const` is a way to declare and initialize a variable that will never change its value. A great way to ensure a variable that is not meant to change never does (your script will throw an error).

(function executeRule(current, previous /*null when async*/) {

	var inc_gr = new GlideRecord('incident');
	inc_gr.query();
	var x = inc_gr.getRowCount();
	
	const y = 100;
	current.work_notes = x + y;

})(current, previous);