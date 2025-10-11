var variable_id = 'YOUR SYS_ID HERE'; //Select box/choice Variable sys_id 
var option_name = current.variables.other_string; //add your variable or otherwise that captures the new choice here
var value = option_name.replaceAll(' ', '_'); //remove spaces and replace with underscores to create the internal name
value = value.toLowerCase(); //make the internal name lower case

var question_item = new GlideRecord('question_choice');
question_item.initialize();
question_item.setValue('text', option_name);
question_item.setValue('value', value);
question_item.setValue('question', variable_id); // using variable sys_Id here
//question_item.setValue('order', 100);
question_item.insert();

//reorder in alphabetical
//NOTE: Make sure your "other" choice has a very high order value (like 5000+ depeding on how you increment/number of choices)

var choices = new GlideRecord('question_choice');
choices.addQuery('question', variable_id);
choices.addQuery('value', '!=', 'other'); //don't include the "Other" choice in the query, it's order is very high to pin to the bottom of the list (8000)
choices.orderBy('text');
choices.query();
var order_increment = 100; //start order at 100
while(choices.next()){
	choices.setValue('order', order_increment);
	choices.update();
	order_increment += 100; //increment order by 100 for each choice
}