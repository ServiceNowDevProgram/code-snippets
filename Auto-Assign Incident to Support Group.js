// Situation: When a new incident is created, automatically assign it to the appropriate support group based on the categorization.

(function executeRule(current, previous /*, g*/) {
    if (current.category == 'Hardware' && current.subcategory == 'Laptop') {
        current.assignment_group = 'Hardware Support';
    } else if (current.category == 'Software' && current.subcategory == 'Application Issue') {
        current.assignment_group = 'Software Support';
    }
})(current, previous);


/*Explanation: This business rule is triggered when a new incident is created. It checks 
the incident's category and subcategory and assigns it to the relevant support group based
  on the categorization. For example, if the incident is related to a hardware issue with a laptop, it assigns the incident to the "Hardware Support" group.*/
