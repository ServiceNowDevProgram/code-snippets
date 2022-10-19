var emailGR = new GlideRecord('sys_email');

emailGR.addQuery('type','send-ready');
emailGR.query();

while (emailGR.next()) {
  emailGR.type = 'send-ignored';
  emailGR.update();
}
