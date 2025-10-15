(function() {

    var THRESHOLD = 4; // min number of similar incidents
    var DAYS = 7;      

   
    var incGR = new GlideAggregate('incident');
    incGR.addEncodedQuery('active=true^opened_atRELATIVEGT@dayofweek@ago@' + DAYS);  //Query  recent incidents
    incGR.groupBy('short_description');
    incGR.addAggregate('COUNT');
    incGR.query();

    while (incGR.next()) {
        var count = parseInt(incGR.getAggregate('COUNT'), 10);
        var desc = incGR.short_description.toString();

       //Checking for high repetition
        if (count >= THRESHOLD) {

             //Avoid duplicate problem 
            var existingProb = new GlideRecord('problem');
            existingProb.addQuery('short_description', 'CONTAINS', desc);
            existingProb.addQuery('active', true);
            existingProb.query();

            if (!existingProb.hasNext()) {

            //if not exist  creating Problem Record
                var prob = new GlideRecord('problem');
                prob.initialize();
                prob.short_description = "Recurring Incident Pattern: " + desc;
                prob.description = "Auto-generated problem for " + count +
                    " similar incidents in the last " + DAYS + " days.\n\nExample Description:\n" + desc;
                prob.u_detected_by = 'System';
                prob.state = 1; 
                var probSysId = prob.insert();

                gs.info(" Created new Problem [" + prob.number + "] for repeated incidents (" + count + "): " + desc);

               //link incident with problem
                var incLinkGR = new GlideRecord('incident');
                incLinkGR.addQuery('short_description', desc);
                incLinkGR.addQuery('active', true);
                incLinkGR.query();
                while (incLinkGR.next()) {
                    incLinkGR.problem_id = probSysId;
                    incLinkGR.update();
                }
            }
        }
    }



})();
