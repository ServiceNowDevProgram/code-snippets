This script include defines a function which will retrieves the subcategories based on the category passed in as input.
This script include can be used in catalog client scripts to load the options of subcategory dynamically based on the category selected.
Use Case:
On the "Create Incident" record producer, load the "Subcategory" based on the "Category" seldcted by end user.
Implementation Details:
Define a "onChange" catalog client script on "Category" field. 
Create a GlideAjax object to the script include class.
Pass the selected category value to the script include.
Script include will return the string of Display Name-Value pair of Subcategories based on the category provided.
Parse the string in the client script and add the Name-Value options to the subcategory field.
You can extend this client script to hide the subcategory if selected category doesn't contains dependent subcategories.
