Multi Row Variable Set (MRVS) variables validations which are based on variables out of MRCV

for this we need to use "g_service_catalog" client side API of ServiceNow

Example:
Requirement is like there is an adaptation leave form, where the user can take 30 leaves in batches not all at once. 
Users can enter the last working date which is a normal variable in catalog item and batched leaves in MRVS where the Extended leave start and end dates will populate.
We are restricting here only to enter extended leave start date after the last working date. 


