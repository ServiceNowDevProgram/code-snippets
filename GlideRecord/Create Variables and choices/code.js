var catArray = ['abc','pqr','xyz'];

var imp = new GlideRecord('item_option_new');// variable table
for(var i=0; i<catArray.length ; i++){
imp.type = '';
imp.cat_item =catArray[i];
imp.active = true;
imp.question_text = 'your_input';
imp.name = 'your_input';
imp.order = 'your_order';
imp.insert();
var id = imp.sys_id;
var qc = new GlideRecord('question_choice');// Choice table
qc.initialize();
qc.text ='your_text';
qc.value ='your_value' ;
qc.order = 'your_order';
qc.question = id;
qc.insert();
}
//You can add as many choice as you like by using for loop
