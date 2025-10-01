# Regenerate the draft document created for e-signature (or) regenerate the draft document if the field values changed after the draft document had created <br />

***Use case:*** The document was generated with the dynamic fields selected in the document template. But if the field values changes after document generation then these changes will not be reflected in the generated document.<br /><br />
***Solution:*** Leverage EDM utils provided OOB and call these utilities to regenerate the documents. After this script runs, a new record will be created in draft_document table. The previous version of the document in draft_document will be set to inactive
