(function() {
    /*
    This code will display the records wher user is mentioned in (@user in Jurnal fields).
    This will also provide the link to record.
    Only top 5 mentions will be displayed.
    */
    data.mentionArr = []; // array to store mentions.
    var mentionRec = new GlideRecord('live_notification');
    mentionRec.addEncodedQuery('user=' + gs.getUserID()); // get only logged-in user's records
    mentionRec.orderBy('sys_created_on'); // get by created date.
    mentionRec.setLimit(5);
    mentionRec.query();
    while (mentionRec.next()) {
        tempval = {}; // temp object.
        tempval.record = mentionRec.getValue('title');
        tempval.user = mentionRec.user.name.toString();
        tempval.user_from = mentionRec.user_from.name.toString();
        tempval.url = '/' + $sp.getValue('url_suffix') + '?id=ticket&sys_id=' + mentionRec.getValue('document') + '&table=' + mentionRec.getValue('table');
        data.mentionArr.push(tempval);
    }
})();
