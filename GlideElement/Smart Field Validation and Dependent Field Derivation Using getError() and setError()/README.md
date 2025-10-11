# GlideElement Validation & Derivation Example

This project demonstrates how to use `GlideElement.setError()` and `GlideElement.getError()` 
to perform validation in one Business Rule and field derivation in another, without repeating logic.

### Flow:
1. BR #1 (`Validate Short Description`) checks text length.
2. BR #2 (`Derive Dependent Fields`) runs only if no validation error exists.
3. Category, Subcategory, and Impact are derived dynamically.
