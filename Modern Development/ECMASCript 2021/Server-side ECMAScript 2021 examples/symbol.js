// Symbol is a built-in object whose constructor returns a symbol primitive — also called a Symbol value or just a Symbol — that's guaranteed to be unique. Symbols are often used to add unique property keys to an object that won't collide with keys any other code might add to the object, and which are hidden from any mechanisms other code will typically use to access the object. That enables a form of weak encapsulation, or a weak form of information hiding.

// Every Symbol() call is guaranteed to return a unique Symbol. Every Symbol.for("key") call will always return the same Symbol for a given value of "key". When Symbol.for("key") is called, if a Symbol with the given key can be found in the global Symbol registry, that Symbol is returned. Otherwise, a new Symbol is created, added to the global Symbol registry under the given key, and returned.

(function executeRule(current, previous /*null when async*/) {

	var incidents = [];
	let incident = {
		number: current.number,
		short_description: current.short_description
	};
	
	incidents.push(incident);
	incidents.push(incident);
	
	var incidents2 = [];
	incidents2.push(Symbol(incident));
	incidents2.push(Symbol(incident));
	
	current.work_notes = (incidents[0] == incidents[1]) + '\n' + (incidents2[0] == incidents2[1]); //Notice how the first one is true and the second is false, despite all four items being the "same"
	
})(current, previous);