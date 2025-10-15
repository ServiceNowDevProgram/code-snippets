**Dynamic Catalog Task Generator**

This Script Include(Attached.js File) provides a flexible, maintainable way to create one or more Service Catalog Tasks (sc_task) on a Request Item (sc_req_item). Instead of relying on complex, branching logic within a single Workflow or Flow, this script determines which tasks to create based on the value selected by the user in a single variable on the catalog form.

This is a best practice for managing Service Catalogs because it:

**Centralizes Task Logic**: Keeps all task definitions (short descriptions, assignment groups, order) in one easy-to-read script.

**Improves Maintainability**: You only update this single script when task requirements change, not a sprawling visual flow.

**Increases Flow Reusability**: The core Flow/Workflow remains simple, focused only on calling this generator.

**Usage**
This script is intended to be called from a Run Script action within a Flow Designer Flow
