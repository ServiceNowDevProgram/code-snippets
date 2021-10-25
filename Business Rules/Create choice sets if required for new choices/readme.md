Type: Business Rule
When: Before
Insert: true

This script checks whether there is a choice set already created/available for the table:element pairing of a new sys_choice.
If there is, it returns without doing anything.
If there is not, it creates the choice set. This prevents the DELETE behaviour that occurs when a new choice is created that doesn't have a valid choice set available to be associated to.