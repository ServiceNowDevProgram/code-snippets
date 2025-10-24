This business rule will operate on the label_entry table to log notes whenever tags are added or removed from specific tables. To implement this, create three system properties:
1. custom.tag_entries.log_removal (true/false): Set this to true to enable logging of tag removals.
2. custom.tag_entries.tables: A list of tables, separated by commas, where notes should be managed.
3. custom.tag_entries.log_addition (true/false): Set this to true to enable logging of tag additions.
One challenge with tags is identifying who added or removed them from records. With these business rules in place, this information will be easily accessible.
