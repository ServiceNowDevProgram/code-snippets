# ServiceNow Script: Submit Catalog Item via Scheduled Job

This script demonstrates how to programmatically submit a ServiceNow **catalog item** using the `Cart` API. It is designed to be run as a **Background Script** or adapted into a **Scheduled Job**. The script includes error handling and logging, and can be extended to support additional use cases such as variable injection or duplicate request prevention.

## 📜 Overview

This script performs the following actions:

1. Generates a unique cart ID.
2. Creates a new cart using the `Cart` API.
3. Adds a catalog item to the cart (no variables required).
4. Places the order.
5. Logs success or error messages.