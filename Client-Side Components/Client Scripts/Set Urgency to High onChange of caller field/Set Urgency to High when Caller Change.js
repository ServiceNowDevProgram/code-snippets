function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    g_form.getReference('caller_id', function(caller) {
        if (caller.vip === true || caller.vip === 'true') {
            g_form.setValue('urgency', '1');

            if (g_form.showFieldMsg) {
                g_form.showFieldMsg(
                    'urgency',
                    'Urgency automatically set to High because caller is VIP',
                    'info',
                    false
                );
            }
        } else {
            // Optional: Do nothing or reset urgency
            // g_form.setValue('urgency', oldValue);
        }
    });
}
