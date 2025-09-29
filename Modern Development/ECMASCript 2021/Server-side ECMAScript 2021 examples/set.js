// The Set object lets you store unique values of any type, whether primitive values or object references. Faster, and forces uniqueness of values.

const mySet1 = new Set()

mySet1.add(1)           // Set [ 1 ]
mySet1.add(5)           // Set [ 1, 5 ]
mySet1.add(5)           // Set [ 1, 5 ]
mySet1.add('some text') // Set [ 1, 5, 'some text' ]
const o = {a: 1, b: 2}
mySet1.add(o)

mySet1.add({a: 1, b: 2})   // o is referencing a different object, so this is okay

mySet1.has(1)              // true
mySet1.has(3)              // false, since 3 has not been added to the set
mySet1.has(5)              // true
mySet1.has(Math.sqrt(25))  // true
mySet1.has('Some Text'.toLowerCase()) // true
mySet1.has(o)       // true

mySet1.size         // 5

mySet1.delete(5)    // removes 5 from the set
mySet1.has(5)       // false, 5 has been removed

mySet1.size         // 4, since we just removed one value

mySet1.add(5)       // Set [1, 'some text', {...}, {...}, 5] - a previously deleted item will be added as a new item, it will not retain its original position before deletion

console.log(mySet1)
// logs Set(5) [ 1, "some text", {…}, {…}, 5 ] in Firefox
// logs Set(5) { 1, "some text", {…}, {…}, 5 } in Chrome

//or in servicenow
(function executeRule(current, previous /*null when async*/) {

	var inc_gr = new GlideRecord('incident');
	inc_gr.orderByDesc('number');
	inc_gr.setLimit(3);
	inc_gr.query();
	
	let incidents = new Set();
	
	while (inc_gr.next()){
		incidents.add(inc_gr.getValue('short_description'));
	}
	
	current.work_notes = incidents.has(inc_gr.getValue('short_description')) + '\n' + incidents.values().next().value + '\n' + incidents.size;
	
})(current, previous);