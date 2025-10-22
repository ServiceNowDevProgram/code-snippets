var elapsedTime = 0;
    var aging = '';
    var actualDateTime = new GlideDateTime();
   
    var rec = new GlideRecord('cases');
    rec.addEncodedQuery('stateNOT IN6,3,7');
    rec.query();
    while (rec.next()) {
    var openedDate = new GlideDateTime(rec.opened_at.getDisplayValue());
    var dur = GlideDateTime.subtract(openedDate,actualDateTime );
    elapsedTime =  dur.getNumericValue()/86400000 ;
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
    rec.aging_category = aging;
    rec.update();
    }
