var gr = new GlideRecord('$0');
var qc = gr.addQuery('field', 'value1');
qc.addOrCondition('field', 'value2');
gr.query();

while (gr.next()) {

}
