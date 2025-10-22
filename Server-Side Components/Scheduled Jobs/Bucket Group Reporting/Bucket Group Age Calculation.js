var rec = new GlideRecord('case'); // any table which you want to use
    rec.addEncodedQuery('stateNOT IN60,40, 20'); // filtering out all the closed/cancelled cases 60 is closed, 40 is cancelled, 20 is rejected
        rec.query();
    while (rec.next()) {
    var openedDate = new GlideDateTime(rec.opened_at.getDisplayValue());
    var dur = GlideDateTime.subtract(openedDate,actualDateTime );
    var elapsedTime =  dur.getNumericValue()/86400000 ;
    // Check to see when the item was created
    var aging;
    if (elapsedTime <= 2) aging = '0-2 Days';
    if (elapsedTime > 2) aging = '3-4 Days';
    if (elapsedTime > 4) aging = '5-7 Days';
    if (elapsedTime > 7) aging = '8-15 Days';
    if (elapsedTime > 15) aging = '16-30 Days';
    if (elapsedTime > 30) aging = '31-60 Days';
    if (elapsedTime > 60) aging = '61-90 Days';
    if (elapsedTime > 90) aging = 'Over 90 Days';
 
    rec.setWorkflow(false); // Skip any Business Rules
    rec.autoSysFields(false); // Do not update system fields
    rec.aging_category = aging; // updating aging category with defined buckets allocated above
    rec.update();
    }
