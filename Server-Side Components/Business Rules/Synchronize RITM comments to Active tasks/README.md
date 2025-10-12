This is an Async Update Business rule written on the Requested Item table.
This code works as a comment synchronization mechanism.

What the code does:
-Comment is added to the parent record(which in this case is a Requested Item)
-Creates an HTML link to the parent record using its number.
-Queries and finds all active SCTASKs associated with the Reuqested item.
-Loops through each SCTASK, adds the copied comment along with a link to the Requested Item.

Let's explain with an example:

RITM: RITM001001
Task 1: SCTASK001001
Task 2: SCTASK001002
-User adds new comment into the RITM: 'This is a test comment.'
-Record link is created and stored inside a clickable RITM number.
-The RITM comment is updated on both the SCTASKs with the comment looking like:
 
    Updated comments on: [RITM001001]
    This is a test comment.
