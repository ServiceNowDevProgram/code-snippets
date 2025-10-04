## Dynamically Switch Form View Based on Field Value

This client script demonstrates how to **automatically switch form views** based on the value of a field.

**Use case:**  
For example, if the **Category** field is set to *Hardware*, the form view switches to **ess**.  
You can extend this by updating the mapping object to support additional fields and values (e.g., *Software → itil*, *Network → support*).

**Benefit:**  
Improves user experience by guiding users to the **most relevant form view**, ensuring the right fields are shown for the right scenario.

**Test:**  
- Change the **Category** field to *Hardware* → Form view should switch to **ess**.  
- Update mapping to add new conditions (e.g., *Software → itil*) and verify the view switches accordingly.

**How to Use:**  
1. **Modify the table name** in the `switchView` function to match your target table:
   ```javascript
   switchView("section", "<your_table_name>", targetView);
2. **Modify the view mapping**
