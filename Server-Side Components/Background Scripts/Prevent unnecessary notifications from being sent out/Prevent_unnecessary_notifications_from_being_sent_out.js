var emailGR = new GlideRecord('sys_email');

// Query for the emails you want to ignore
emailGR.addQuery('state', 'ready'); // Only emails that are ready to send
emailGR.addEncodedQuery("sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()"); // Optional timeline filter

// Set the fields to ignore and update all matching records at once
emailGR.setValue('state', 'ignored'); // Set state to "ignored"
emailGR.setValue('type', 'send-ignored'); // Set type to 'send-ignored'
emailGR.updateMultiple(); // Bulk update all matching records

gs.info('All relevant emails have been marked as ignored.');
