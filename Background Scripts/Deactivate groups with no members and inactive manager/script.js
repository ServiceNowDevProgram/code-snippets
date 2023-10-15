var gr = new GlideRecord('sys_user_group');
gr.addEncodedQuery("active=true^manager.active=false^RLQUERYsys_user_grmember.group,<1,m2m^ENDRLQUERY");
gr.query();
gr.active = false;
gr.updateMultiple();
