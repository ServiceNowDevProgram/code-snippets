**Scenario**: Synchronize fields between two different tables.

**Example**: Any changes made to the fields on the New Hire HR Case for a user, where the same field also exists on the HR Profile, will automatically be updated on the HR Profile when the field is modified on the case.
Fields on the case that are derived from the HR Profile are excluded from this synchronization.

**Script Logic**: An after-update business rule that checks the updated fields in the current table (HR case) exist in the other table (HR Profile) and updates them accordingly.
