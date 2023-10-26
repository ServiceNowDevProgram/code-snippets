var gr=new GlideRecord('sys_user');
gr.intialise();
gr.user_name='test.user';
gr.first_name='test';
gr.last_name='user';
gr.email='test.user@servicenow';
gr.insert();
