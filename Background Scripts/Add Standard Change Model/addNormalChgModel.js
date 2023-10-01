var sid = 'ADD YOUR CHANGE RECORD SYS_ID HERE';

var chg = new GlideRecord('change_request');
if(chg.get(sid)) {
    chg.setValue('chg_model', '007c4001c343101035ae3f52c1d3aeb2'); //normal change model
chg.update();
}
