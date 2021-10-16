// Get a mid server object by name
var ms = MIDServer.getByName("windows_mid");
// Stringify the object for display purposes
gs.info(JSON.stringify(ms)); 
// Show the value of each API property 
gs.info('hostmane ' + ms.hostname);
gs.info('hostOS ' + ms.hostOS);
gs.info('ip ' + ms.ip);
gs.info('name ' + ms.name);
gs.info('routerIP ' + ms.routerIP);
gs.info('status ' + ms.status);
gs.info('sysID ' + ms.sysID);
gs.info('url ' + ms.url);
gs.info('version ' + ms.version);
gs.info('windowsDomain ' + ms.windowsDomain);

// After configuring default mid server for an app by navigating to MID Server > Applications
mid = MIDServer.getDefaultForApp('Discovery');
gs.info('defaultMid: ' + JSON.stringify(mid));

// To demonstrate the other API methods, get a discovery schedule instance that uses a mid server since it is a required input property
// the input is the schedule's sys_id
var schedule = new DiscoverySchedule('6cadd0a92f8f30102613802df699b602');
gs.info('schedule: ' + JSON.stringify(schedule));

// Get the default mid server for a schedule (If it is associated with a default app)
var defaultMidServer = MIDServer.getDefault(schedule);
gs.info('defaultMidServer: ' + JSON.stringify(defaultMidServer));
