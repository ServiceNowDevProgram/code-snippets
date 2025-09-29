// The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.

// Object is similar to Map—both let you set keys to values, retrieve those values, delete keys, and detect whether something is stored at a key. For this reason (and because there were no built-in alternatives), Object has been used as Map historically.

// However, there are important differences that make Map preferable in some cases:

// - Accidental Keys (objects initialize with prototype)
// - Key types (previously just strings or symbols, now can be functions, objects, any primitive)
// - Key Order (simplified to order of entry insertion)
// - Size (inherent size property)
// - Iteration (objects aren't inherently iterable)
// - Performance (additions and removals are more performative)
// - Serialization and parsing (object wins in this case)

(function executeRule(current, previous /*null when async*/) {

	var inc_gr = new GlideRecord('incident');
	inc_gr.orderByDesc('number');
	inc_gr.setLimit(3);
	inc_gr.query();
	
	const incidents = new Map();

	const keyString = 'a string';
	const keyObj = {};
	const keyFunc = function() {};
	
	inc_gr.next();
	incidents.set(keyString, inc_gr.getValue('short_description'));
	
	inc_gr.next();
	incidents.set(keyObj, inc_gr.getValue('short_description'));
	
	inc_gr.next();
	incidents.set(keyFunc, inc_gr.getValue('short_description'));

	let work_notes = [];
	work_notes.push('map size: ' + incidents.size);
	work_notes.push(incidents.get(keyString));
	work_notes.push(incidents.get(keyObj));
	work_notes.push(incidents.get(keyFunc)); //Finding an a value by providing a function!
	work_notes.push(incidents.get('a string'));

	current.work_notes = work_notes.join('\n');
	
})(current, previous);
