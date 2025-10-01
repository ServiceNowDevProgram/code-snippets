var UpdateINCworkNotes = Class.create();
UpdateINCworkNotes.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getIncLastWorknotes: function() {
        var id = this.getParameter('sysparm_id');
       // var table = 'incident';
        var list = new GlideRecord("sys_journal_field");
        list.addEncodedQuery("element_id=" + id + "^element=comments^ORelement=work_notes");

        list.orderByDesc('sys_created_on');
        list.setLimit(1);
        list.query();
        list.next();
        return list.value.toString()
    },


    updateCommentsLatest: function() {
        var id = this.getParameter('sysparm_id');
        var newcomment = this.getParameter('sysparm_newcomment');
     //   var table = 'incident';
        var list = new GlideRecord("sys_journal_field");
        list.addEncodedQuery("element_id=" + id + "^element=comments^ORelement=work_notes");
        list.orderByDesc('sys_created_on');
        list.setLimit(1);
        list.query();
        list.next();
        list.value = newcomment;
        list.update();

        var list1 = new GlideRecord("sys_audit");
        list1.addEncodedQuery("documentkey=" + id + "^fieldname=comments^ORfieldname=work_notes");
        list1.setLimit(1);
        list1.orderByDesc('sys_created_on');
        list1.query();
        if (list1.next()) {
            list1.newvalue = newcomment
            list1.oldvalue = '';
            list1.update();
        }

        var list3 = new GlideRecord("sys_history_set");
        list3.addEncodedQuery("id=" + id);
        list3.setLimit(1);
        list3.query();
        if (list3.next()) {
            list3.deleteRecord();
        }
       window.location.reload();
    },

    type: 'UpdateINCworkNotes'
});
