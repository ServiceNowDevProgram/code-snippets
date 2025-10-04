addLoadEvent(function() {
    try {
        // Skip contexts where GlideDialogWindow isn't available (e.g., Service Portal)
        if (typeof GlideDialogWindow === 'undefined' || (window.NOW && NOW.sp))
            return;
        var prefName = 'login.consent1';
        // Only show the dialog when the pref is explicitly 'false'
        var val = (typeof getPreference === 'function') ? getPreference(prefName) : null;
        var shouldShow = String(val || '').toLowerCase() === 'false';
        //alert("val"+" "+val+" "+"shouldShow"+" "+shouldShow);
        if (!shouldShow)
            return;
        var dialog = new GlideDialogWindow('acknowledgement_dialog'); // UI Page name
        dialog.setTitle('Acknowledge Message');
        dialog.setSize(500, 300);
        dialog.render();
    } catch (e) {
        if (console && console.warn) console.warn('ack loader error', e);
    }
});
