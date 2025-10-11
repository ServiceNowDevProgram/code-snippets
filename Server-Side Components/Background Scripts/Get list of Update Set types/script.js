function getListOfUpdateSetTypes(update_set){
    var result = []
    var gr = new GlideAggregate('sys_update_xml');
    gr.addQuery('update_set', update_set);
    gr.groupBy('type');
    gr.query();
    while(gr.next()){
        result.push(gr.type.getDisplayValue())
    }
    return result;
}

getListOfUpdateSetTypes('update_set_sys_id');
