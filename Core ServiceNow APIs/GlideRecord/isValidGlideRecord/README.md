# Description

Many developers are building functions which expect any GlideRecord reference as a function parameter but within these functions they do no check whether the passed value really represents a valid GlideRecord. However to test a function parameter for a valid GlideRecord reference is pretty tricky and extensive. Therefore I built a small helper function `isValidGlideRecord` which will do the job. As a second optional parameter you can specify a table name which will be considered for an additional validation.

# Usage

```
var grIncident = new GlideRecord('incident');

grIncident.get('12345678901234567890123456789012');

gs.info(isValidGlideRecord(grIncident, 'incident'));
```
