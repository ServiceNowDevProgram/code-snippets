var sid = 'ADD YOUR CHANGE RECORD SYS_ID HERE';

var chg = new GlideRecord('change_request');
if(chg.get(sid)) {
    chg.setValue('chg_model', 'e55d0bfec343101035ae3f52c1d3ae49'); //standard change model
chg.update();
}
