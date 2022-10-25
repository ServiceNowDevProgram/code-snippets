# **Choice Field Validator**

Function that returns the value of a choice by its display value. Initially created to be used in field map scripts.
Used to return the choice even if the instance is in different language.


## *Important points*
- It is imperative that the display value exists in the instance
- It is possible to validate the values of choices dependent on other choices


## **Example configuration**

1. Category validation:
![category-validation](choice-validator1.png)

2. Category and subcategory validation:
![category-subcategory-validation](choice-validator2.png)


In these previous cases we used the validator to get the errors / skipped lines in the sys_import_state table.
