gs.include('validators');

if (current.getTableName() == "sc_task") {

    // Update comments on current sc_task and save it
    current.comments = "reply from: " + email.origemail + "\n\n" + email.body_text;
   

    // Parse Date (DD-MM-YYYY)
    var DateMatch = email.body_text.match(/Date:\s*([\d]{2}-[\d]{2}-[\d]{4})/i);

    var DateStr = DateMatch ? DateMatch[1] : null;

    // Parse "Are you good to Processed "
    var process = email.body_text.match(/Are you good to Processed\?\s*:\s*(Yes|No)/i);
  
    var proceeStr = process ? procee.match[1].toLowerCase() : null;

    
     if (DateStr) {
                var gd = new GlideDate();
                gd.setValue(DateStr);
                current.setValue('u_date', gd); // replace with field
               
            }

            // Update "Are you good to Process" if found
            if (proceeStr) {
               
                var normalizedInput = proceeStr.toLowerCase();

                var choiceValue = null;
                if (normalizedInput === 'yes') {                          //converting Yes/ No field to 1 , 2  as per backend field sc_task
                    choiceValue = '1'; // choice value for Yes
                } else if (normalizedInput === 'no') {
                    choiceValue = '2'; // choice value for No
                }

                if (choiceValue) {
                    current.setValue('u_processed', choiceValue); //set value in custom field 
                    
                } 
            }
       
       
        
    }

    current.state = 3;
    current.update();
}
