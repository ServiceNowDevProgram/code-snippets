// I love this one because it makes it so much easier to copy and paste multi-line strings into my code. I use this a lot on AdventOfCode challenges!

(function executeRule(current, previous /*null when async*/) {

	let x = `hello
	world
	lchh loves you`;
	
	current.work_notes = x; //goodbye \n

})(current, previous);

// Another way that these are helpful are for templates (Thanks Chris Helming for the suggestion):

(function executeRule(current, previous /*null when async*/) {

	const a = 5; 
	const b = 10; 
	current.work_notes = `Fifteen is ${a + b} and not ${2 * a + b}.`;

})(current, previous);
