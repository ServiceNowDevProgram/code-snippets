This is a before Business rule with update(checked)
When we try to move the record from new to assess state it will check for the possible conficts which are available in the record. even if it finds a single match. It restricts the record to move further and it pops an error message to the user indicating that there are conficts to resolve before moving to the assess State

This code helps in restricting the records to move further especially for change requests if there are some conflicts in the records it also shows an error message to the user.
