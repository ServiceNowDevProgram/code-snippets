When we want to open a catalog item with details from current record and map it to the opened catalog form then we can use this code.

This UI Action and catalog client script Redirects you to the record producer or catalog item( based on the sys id provided) and auto-populates the fields from the parent record to the catalog item/record producer variables.

1. UI Action
   Client - true
   action name - open_item
   show update - true ( As per your requirement)
   onClick - openItem();
   Workspace Form button - true
   Format for Configurable Workspace - true 

2. Catalog Client script.
   Type - Onload
   Applies on catalog item view - true
   Name - ParseURL

Note : Above UI Action works in Configurable workspace and opens the catalog item/record producer in workspace itself.
