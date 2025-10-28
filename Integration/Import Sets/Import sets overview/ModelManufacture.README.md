When importing or processing Configuration Items (CIs), especially hardware assets, missing model or manufacturer data can cause CI creation failures or incomplete relationships.
This script handles that automatically by:
* Checking if a manufacturer already exists in the core_company table.
* Checking if a model already exists in the cmdb_model hierarchy.
* Creating the manufacturer and/or model records if they are missing.

How It Works

1. Extracts model and manufacturer names from the data source (source.u_model and source.u_manufacturer).
2. Calls getOrCreateManufacturer():
    * Searches the core_company table by name.
    * Creates a new company record if not found.
3. Calls getOrCreateModel():
    * Searches the cmdb_model table (including child tables).
    * If no match exists, inserts a new record in cmdb_hardware_product_model.
4. Logs each action (found, created, or failed) for debugging and auditing.
