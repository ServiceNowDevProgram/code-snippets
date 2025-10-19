**Use Case**
1. Adding string in HTML template without ${} or gs.getMessage('string') in server script attracts HealthScan findings.
2. These string do not get translated in multi lingual portals.
3. This will help in ensuring internationalization. Same BR can be used in "sp_ng_template" table.

**How to use**
1. Add this code as before insert/update BR on sp_widget table.
2. The condition will be "Body HTML Changes."
3. If Internationalisation is not followed, error message will be shown and action will be aborted.

**Regex**
/>([a-zA-Z].*)<\//
This Regex check any direct string between > and </ without ${} or ::data.string or :data.string
