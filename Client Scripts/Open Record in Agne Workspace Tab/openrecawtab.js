// Opens a Story attached to a Incident record in the parent field in the readonly mode.
  
g_aw.openRecord('rm_story', g_form.getValue('parent'), {readOnlyForm: true}); 
