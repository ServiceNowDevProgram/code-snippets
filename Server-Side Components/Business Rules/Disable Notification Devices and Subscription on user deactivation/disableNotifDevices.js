(function executeRule(current, previous /*null when async*/ ) {

    var currentUserId = current.getUniqueValue();

    var notifDevice = new GlideRecord('cmn_notif_device');
    notifDevice.addQuery('user', currentUserId);
    notifDevice.addQuery('active', true);
    notifDevice.query();
    while (notifDevice.next()) {
        notifDevice.active = false;
        notifDevice.update();
    }


    var notifSubs = new GlideRecord('sys_notif_subscription');
    notifSubs.addQuery('user', currentUserId);
    notifSubs.addQuery('active', true);
    notifSubs.query();
    while (notifSubs.next()) {
        notifSubs.active = false;
        notifSubs.update();
    }



})(current, previous);
