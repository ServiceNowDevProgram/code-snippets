Update CI status on Change Request Closure 

1. Create a Business Rule - After Update
2. Select the Change Request Table.
3. Add a condition as when Change state = "Closed"
4. Run only when Change is moving to Closed
5. Query all CI relationships for this Change Request
6. Update CI status based on the condition
7. The relationship table that links a change (task) to CIs (ci_item).
