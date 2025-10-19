**Use Case**
Adding string in HTML template without ${} or gs.getMessage('string') in server script attracts HealthScan findings.
These string do not get translated in multi lingual portals.
This will help in ensuring internationalization.
Same BR can be used in "sp_template" table.

**How to use**
1. Add this code as before insert/update BR on sp_widget table.
2. The condition will be "Body HTML Changes."
3. If Internationalisation is not followed, error message will be shown and action will be aborted.
