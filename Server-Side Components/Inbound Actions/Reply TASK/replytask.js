//Reply Inbound Email Action
// Table - sc_task

// Type - Reply
//Order - 100

// Condition - Subject - has been assigned for Satiesfiction

//Script

gs.include('validators');

if (current.getTableName() == "sc_task") {

    // Update comments on current sc_task and save it
    current.comments = "reply from: " + email.origemail + "\n\n" + email.body_text;
   

    // Parse Date (YYYY-MM-DD)
    var DateMatch = email.body_text.match(/Date:\s*([\d]{4}-[\d]{2}-[\d]{2})/i);

    var DateStr = DateMatch ? DateMatch[1] : null;

    // Parse "Are you good to Processed "
    var process = email.body_text.match(/Are you good to Processed\?\s*:\s*(Yes|No)/i);
  
    var proceeStr = process ? procee.match[1].toLowerCase() : null;

    
     if (DateStr) {
                var gd = new GlideDate();
                gd.setValue(DateStr);
                parentCaseGR.setValue('u_date', gd); // replace with your field
               
            }

            // Update "Are you good to Process" if found
            if (proceeStr) {
               
                var normalizedInput = proceeStr.toLowerCase();

                var choiceValue = null;
                if (normalizedInput === 'yes') {
                    choiceValue = '1'; // choice value for Yes
                } else if (normalizedInput === 'no') {
                    choiceValue = '2'; // choice value for No
                }

                if (choiceValue) {
                    parentCaseGR.setValue('u_processed', choiceValue);
                    
                } 
            }
       
       
        
    }

    current.state = 3;
    current.update();
}

