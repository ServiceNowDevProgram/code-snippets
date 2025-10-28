var replacemyname;
var replaceis=new GlideRecord('sys_user_group');
replaceis.addEncodedQuery('nameLIKEIT_SAP');
replaceis.query();
while(replaceis.next())
{
replaceis.name=replaceis.name.replace(/IT_SAP/g, 'IT_ERP'); // /IT_SAP/g is oldvalue 'IT_ERP' is new value
replaceis.update();
}
