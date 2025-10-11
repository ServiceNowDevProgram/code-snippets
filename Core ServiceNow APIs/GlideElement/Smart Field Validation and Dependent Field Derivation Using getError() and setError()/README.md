# Smart Field Validation and Dependent Field Derivation Using GlideElement.getError()

This project demonstrates how to use `GlideElement.setError()` and `GlideElement.getError()` 
to perform validation in one Business Rule and field derivation in another, without repeating logic.

## 📘 Overview

This snippet demonstrates how to share validation state and error messages between multiple Business Rules using `GlideElement.setError()` and `GlideElement.getError()` in ServiceNow.

By propagating validation context across Business Rules, developers can:

- Avoid repeated validation logic.  
- Trigger dependent field updates only when a field passes validation.  
- Maintain consistent and clean data flow between sequential rules.  

This technique is especially useful when different validation or derivation rules are split by purpose or owned by different teams.

---

## 🧠 Concept

When one Business Rule sets an error on a field using `setError()`, the error message persists in memory for that record during the same transaction.  
A later Business Rule (executing at a higher order) can then retrieve that message using `getError()` and make data-driven decisions.

### Flow:
1. BR #1 (`Validate Short Description`) checks text length.
2. BR #2 (`Derive Dependent Fields`) runs only if no validation error exists.
3. Category, Subcategory, and Impact are derived dynamically.

## 🚀 Benefits

- ✅ Reduces redundant validation checks
- ✅ Improves rule execution efficiency
- ✅ Keeps logic modular and maintainable
- ✅ Provides better visibility and control in field validations
