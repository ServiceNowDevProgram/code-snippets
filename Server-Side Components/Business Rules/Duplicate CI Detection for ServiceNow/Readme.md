Duplicate CIs (Configuration Items) in the CMDB cause data redundancy, reporting errors, and incorrect impact analysis.
This project automatically detects potential duplicate CIs during record creation or update, using partial string matching and fuzzy comparison on fields like Name, Serial Number, or Asset Tag.

It can warn the user, flag duplicates, or even prevent save depending on configuration.

🚀 Features

Detects duplicate Configuration Items on insert or update

Matches based on configurable fields (e.g., name, serial_number, asset_tag)

Uses partial/fuzzy matching (e.g., "Laptop123" ≈ "Laptop-123")

Optionally prevents saving duplicate entries

Works on both platform UI and Service Portal

Extendable for custom CI classes (cmdb_ci_computer, cmdb_ci_server, etc.)
