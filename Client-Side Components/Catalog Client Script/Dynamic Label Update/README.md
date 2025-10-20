**Dynamic Catalog Variable Label Update**

**Description**
This catalog client script dynamically updates the label of one variable based on the value of another.  
It's useful when you want to provide contextual labels for dependent fields in Service Catalog items.

**Example**
If Asset Type = "Software", then the label for "Asset Name" becomes "Software Asset Name".

**Catalog Client Script Configuration**
- Type: onChange
- Variable name: asset_type
