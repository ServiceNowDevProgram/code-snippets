// What's the difference between `var` and `let`?

// Scoping rules
// The main difference is scoping rules. Variables declared by var keyword are scoped to the immediate function body (hence the function scope) while let variables are scoped to the immediate enclosing block denoted by { } (hence the block scope).

// Hoisting
// While variables declared with var keyword are hoisted (initialized with undefined before the code is run) which means they are accessible in their enclosing scope even before they are declared

// Creating global object property
// At the top level, let, unlike var, does not create a property on the global object

// Redeclaration
// In strict mode, var will let you re-declare the same variable in the same scope while let raises a SyntaxError.

(function executeRule(current, previous /*null when async*/) {

	var inc_gr = new GlideRecord('incident');
	inc_gr.query();
	var x = inc_gr.getRowCount();
	
	let y = 200;
	current.work_notes = x + y;

})(current, previous);