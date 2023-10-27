var gr = new GlideRecord('sys_user');
gr.initialize();
gr.setValue('user_name', 'azeez.gaa');
gr.setValue('first_name', 'Azeez');
gr.setValue('last_name', 'Gaa');
gr.setValue('sys_created_on', '1999-03-09 12:00:00');
gr.setNewGuidValue('azeez.gaa');
gr.autoSysFields();
gr.insert();
