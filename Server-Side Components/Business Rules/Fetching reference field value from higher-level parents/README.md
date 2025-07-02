This is a "**before insert/update**" Business Rule
We are fetching a reference field value from higher-level parents in hierarchy 
when there is a field containing the parent record in the children and 
our use-case reference field is present in all the tables in hierarchy

In the code, we are referring to "reference field name we want to populate" as "_r1_"
In the code, we are referring to "reference field containing parent record" as "_parent_"

The "**JSUtil.nil**" is being used to check for empty/null value for the field.


Through the code we are checking the empty value of the use-case reference field and dot walking to parents and fetching the value from them if it exists
