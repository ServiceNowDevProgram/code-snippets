(function() {
  data.delegates = [];
  var currentUser = gs.getUserID(); 

  if (input && input.action === 'save_delegate' && input.record) {
    var rec = input.record;
    var gr;
    if (rec.sys_id) {
      gr = new GlideRecord('sys_user_delegate');
      if (!gr.get(rec.sys_id)) {
        gr.initialize();
      }
    } else {
      gr = new GlideRecord('sys_user_delegate');
      gr.initialize();
    }

    gr.setValue('user', currentUser);

    if (rec.delegate) gr.setValue('delegate', rec.delegate);
    if (rec.starts) gr.setValue('starts', rec.starts);
    if (rec.ends) gr.setValue('ends', rec.ends);

    gr.setValue('approvals', rec.approvals ? 'true' : 'false');
    gr.setValue('assignments', rec.assignments ? 'true' : 'false');
    gr.setValue('notifications', rec.notifications ? 'true' : 'false');
    gr.setValue('invitations', rec.invitations ? 'true' : 'false');

    var id = gr.update();
    data.saved_sys_id = id;
  }

  if (input && input.action === 'delete_delegate' && input.sys_id) {
    var ddel = new GlideRecord('sys_user_delegate');
    if (ddel.get(input.sys_id)) {
      ddel.deleteRecord();
      data.deleted = true;
    } else {
      data.deleted = false;
    }
  }


  var grList = new GlideRecord('sys_user_delegate');
  grList.addQuery('user', currentUser);
  grList.orderByDesc('starts');
  grList.query();
  while (grList.next()) {
    var obj = {};
    obj.sys_id = grList.getUniqueValue();
    obj.user = grList.getValue('user');
    obj.delegate = grList.getValue('delegate');
    obj.user_display = grList.getDisplayValue('user');
    obj.delegate_display = grList.getDisplayValue('delegate');
    obj.starts_display = grList.getDisplayValue('starts');
    obj.ends_display = grList.getDisplayValue('ends');
    obj.starts_value = grList.getValue('starts');
    obj.ends_value = grList.getValue('ends');
    obj.approvals = grList.getValue('approvals') === 'true' || grList.getValue('approvals') === '1';
    obj.assignments = grList.getValue('assignments') === 'true' || grList.getValue('assignments') === '1';
    obj.notifications = grList.getValue('notifications') === 'true' || grList.getValue('notifications') === '1';
    obj.invitations = grList.getValue('invitations') === 'true' || grList.getValue('invitations') === '1';

    obj.user_sys_id = obj.user;
    obj.delegate_sys_id = obj.delegate;

    data.delegates.push(obj);
  }
})();
