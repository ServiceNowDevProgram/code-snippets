# Prevent Incident Closure Without a Close Code

This snippet is for a **'before' Business Rule** that prevents a user from closing an incident if the 'Close Code' field is empty. It displays an error message and aborts the update.

## How to Use

1.  **Table:** `incident`
2.  **When:** `before`
3.  **Actions:** Check `update`
4.  **Condition (Filter):**
    * `State | changes to | Closed`
    * *(Note: 'Closed' is often value 7, but check your instance)*
5.  **Advanced Tab:**
    * Check the `Advanced` box.
    * Paste the code from `prevent_closure.js` into the script field.