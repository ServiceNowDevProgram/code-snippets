//This UI action helps in generating a problem record from a chnage or an incident form
var createPrb = new GlideRecord("problem"); // Gliding the problem table
createPrb.initialize();
createPrb.short_description = current.short_description; // taking current records short description as problem short description(problem statement)
createPrb.first_reported_by_task = current.getUniqueValue();
createPrb.cmdb_ci = current.cmdb_ci; //taking the affected in configuration item
createPrb.insert(); //inserting the record into the problem table
gs.addInfoMessage("problem number" + createPrb.number.getDisplayValue()); // informing the user with the created problem record number for easy reference.
action.setRedirectURL(current);
