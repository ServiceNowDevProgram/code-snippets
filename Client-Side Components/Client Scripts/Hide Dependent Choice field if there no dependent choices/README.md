Hide the dependent choice field when there are no available options for the selected parent choice.

For example, if a selected category on the incident form has no subcategories, then the subcategory field should be hidden.

The file NumberOfDependentChoices.js is a client callable script include file which has a method which returns number of dependent choices for a selected choice of parent choice field.

HideDepnedentField.js is client script which hides the dependent choice field(ex:subcategory field on incident form) if there are no active choices to show for a selected choices of it's dependent field (example: category on incident form)
