# Get Multi-row Variable Set Values from parent form

Sometimes you need to query the current set of values for a MRVS from the actual MRVS or another MRVS. 
This requires getting the data from the parent form, the method to retrieve and the format of the data is different
when running on the platform or portal.

This script gives a way of getting the values regardless of the platform in use.

On the platform (backend) this could be moved to a global UI Script, but that is not available to portal scripts.

Make sure the UI Type is All, and Isolate Script is false (unchecked).
