var grMob = new GlideAggregate('u_alm_mobile');
grMob.addAggregate('COUNT', 'serial_number');
grMob.groupBy('serial_number');
grMob.addHaving('COUNT', '>', 1);
grMob.query();
while (grMob.next())
	{	
	gs.log("Numb of Duplicates: " + grMob.getAggregate('COUNT', 'serial_number') + " => " + grMob.serial_number, 'DuplicateSerailNumber');
	var dup = new GlideRecord('u_alm_mobile');
	dup.addQuery('serial_number',grMob.serial_number);
	dup.orderByDesc('sys_created_on');
	dup.query();
	if(dup.next())
		{
		var del = new GlideRecord('u_alm_mobile');
		del.addQuery('sys_id','!=',dup.sys_id);
		del.addQuery('serial_number',dup.serial_number);
		del.query();
		while(del.next())
			{
			var ci = new GlideRecord('u_cmdb_ci_mobile');
			ci.addQuery('sys_id',del.ci);
			ci.query();
			if(ci.next())
				{
				ci.deleteRecord();				
			}
			del.deleteRecord();
			
		}
	}
}
