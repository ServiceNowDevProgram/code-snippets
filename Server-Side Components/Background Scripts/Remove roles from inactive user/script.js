var gr = new GlideRecord('sys_user_has_role');
gr.addEncodedQuery('user.active=false');
gr.query();
gr.deleteMultiple();