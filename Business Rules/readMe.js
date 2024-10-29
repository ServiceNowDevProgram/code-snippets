In this before insert/update Business Rule
we are fetching a reference field value from higher-level parents in hierarchy 
when there is a field containing the parent record in the children and 
our use-case reference field is present in all the tables in hierarchy

I am checking the empty value of the use-case reference field and dot walking to parents and fetching the value from them if it exists
