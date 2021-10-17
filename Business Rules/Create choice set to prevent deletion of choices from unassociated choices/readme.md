Business Rule

When: Before
Insert: True

When adding a new choice, and if there is currently no 'choice set' associated with table and element in the sys_choice table, the entries are marked as a DELETE operation in the update set, and all existing choices are also deleted.

This script ensures that a 'Choice Set' will be created for new Choices that don't currently have an associated Choice Set.