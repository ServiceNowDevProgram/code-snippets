ADD HTML Input Field in GlideModal Window:

It is possible to add a HTML input field in GlideModal window in servicenow.
The most common approach involves including a WYSIWYG editor (such as TinyMCE) in the UI Page that you render inside a GlideModal. This enables full rich text functionality within the modal dialog.
Steps :
1) Create UI Page (eg: rich_text_modal) 
2) Create UI Action (eg: Add Details. here I created the ui action on incident table)
3) Open the incident record , click on the Add Details button , which opens the glide modal and includes fields like short description of type 'string' and description of type 'Rich Text/HTML'



