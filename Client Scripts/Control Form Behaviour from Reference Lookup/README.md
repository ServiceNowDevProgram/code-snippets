# Use Case

Clicking the lookup icon on a reference field opens the list view for the referenced table. On clicking the 'New' button to create new records on the reference table, 'Default' form view for that table is displayed. There might be a requirement to control the form's behaviour when the new record form is opened from a designated field on a specific table.


# Usage

Write a client script/scripted UI policy on the reference table and add the code in ```script.js``` file.


# Explanation

The URL parameters contains the necessary information about the originating table and field from where the lookup icon is clicked. These parameters can be extracted using the client-side class ```GlideURL```. Key parameters of interest here:
  - ```sysparm_nameofstack: "reflist"``` ==> Will always be reflist when form has originated from a reference lookup icon click
  - ```sysparm_target: "change_request.cmdb_ci"``` ==> Will be in the format <table_name>.<field_name>
