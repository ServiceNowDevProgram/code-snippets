/*
* Script Name: Remediate Non-licensable software install normalization
* Description: Finds all software installation records that have a normalized product,
*              but where the normalized product is not marked as licensable.
*              It then clears the 'norm_product' and 'norm_publisher' fields on these records.
* Purpose:     This prevents non-licensable software installations from being included in
*              Software Asset Management (SAM) reconciliation and ensures data accuracy
*              for reporting.
*
* Execution:   Typically run as a Fix Script or Scheduled Job.
*/

// Initialize a GlideRecord object for the Software Installation table.
var gr = new GlideRecord('cmdb_sam_sw_install');

// Add an encoded query to find the specific records to be updated.
// 'norm_productISNOTEMPTY' finds records where the normalized product field is not empty.
// '^' acts as the AND operator in an encoded query.
// 'norm_product.product_type!=licensable' filters for records where the product type
// of the normalized product is not 'licensable'.
gr.addEncodedQuery('norm_productISNOTEMPTY^norm_product.product_type!=licensable');

// Clear the normalized product field by setting its value to an empty string.
gr.setValue('norm_product', '');

// Clear the normalized publisher field.
gr.setValue('norm_publisher', '');

// This is a bulk update, so business rules are disabled for better performance.
// Disabling workflows (and business rules) prevents recursive updates and avoids triggering
// unnecessary logic for each record during this cleanup process.
gr.setWorkflow(false);

// Execute the update on all records that match the query conditions.
// The updateMultiple() method is more efficient for batch operations than iterating through each record with a while loop and calling update().
gr.updateMultiple();
