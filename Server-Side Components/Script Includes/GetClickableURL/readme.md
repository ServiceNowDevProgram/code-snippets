Function that generates clickable HTML links to records in different UI contexts (Native UI, Workspace or Portal)




Sample background Script:

var record_sysid = '';// add the record sys_id here.
gs.info(new global.GetRecordDetails().getClickableURL('incident', record_sysid, 'INC- Workspace', 'workspace', 'cwf/agent'));

gs.info(new global.GetRecordDetails().getClickableURL('incident', record_sysid, 'INC- Portal', 'portal', 'sp'));

gs.info(new global.GetRecordDetails().getClickableURL('incident', record_sysid, 'INC - NativeUI', 'native'));

gs.info(new global.GetRecordDetails().getClickableURL('', record_sysid, 'INC - NativeUI', 'native'));
