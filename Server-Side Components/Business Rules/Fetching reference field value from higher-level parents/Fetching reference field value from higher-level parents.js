// In this before insert or update Business Rule, we are fetching a reference field value from higher-level parents in hierarchy when there is a field containing the parent record in the children and our use-case reference field is present in all the tables in hierarchy
// I would be referring to "reference field name we want to populate" as "r1"
// I would be referring to "reference field containing parent record" as "parent"


(function executeRule(current, previous /*null when async*/ ) {
    if (current.r1 == "" && !JSUtil.nil(current.parent.r1)) // Populate 'use-case reference field' from parent's value for the reference field'
        current.r1 = current.parent.r1;
    else if (current.< reference field name we want to populate > == "" && !JSUtil.nil(current.parent.parent.r1)) // Populate 'use-case reference field' from 'parent of parent' 
        current.r1 = current.parent.parent.r1;

})(current, previous);
