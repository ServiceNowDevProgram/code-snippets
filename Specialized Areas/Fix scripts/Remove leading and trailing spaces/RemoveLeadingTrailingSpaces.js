var page = 1;
var count = 0;
var infoMsg = 'Fix Script to remove leading or trailing spaces from short_description. \n';
var sd = '';  //sd inshort for shortdescription 


var regExSpacecheck = /^\s+|\s+$/g;  //regular expression to check if a sentence has leading and trailing spaces.

var grInc = new GlideRecord('incident');
grInc.addEncodedQuery('short_descriptionISNOTEMPTY');
grInc.query();
while (grInc.next()) {

    if (regExSpacecheck.test(grInc.short_description)) {

        infoMsg += 'incident record found with leading or trailing space for short_description: ' + grInc.sys_id + '\n';
        infoMsg += 'Sd ' + grInc.short_description + 'Contains leading or trailing spaces \n';
        sd = grInc.short_description;
        sd = sd.trim();    //trimmed value of short description
        infoMsg += 'sd is ' + sd + '\n';

        if (regExSpacecheck.test(sd)) {
            infoMsg += 'sd: ' + sd + ' still has a trailing space\n';
        } else {
            infoMsg += 'sd: ' + sd + ' no longer contains trailing space \n';
        }
        //Replace the value for u_location_svid with the trimmed version
        grInc.setValue('short_description', sd);
        grInc.setWorkflow(false);
        grInc.update();

        count++;

        if (count == 50) {
            gs.info(infoMsg);
            page++;
            count = 0;
            infoMsg = 'Fix Script to remove leading or trailing spaces from short_description  (' + page + ')\n';
        }

    }

}
