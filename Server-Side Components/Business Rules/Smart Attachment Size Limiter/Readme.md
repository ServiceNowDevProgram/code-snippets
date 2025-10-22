Smart Attachment Size Limiter
This Business Rule limits attachment sizes uploaded to ServiceNow records by enforcing a maximum size configured via the system property com.glide.attachment.max_size (in bytes). If the attachment exceeds the configured limit, the upload is blocked with an error message shown to the user. You can create or modify this system property to change the max size and update the property name in the script accordingly.

Scoped Application Note:
If deploying in a scoped application, configure Cross-Scope Access under System Applications > Application Cross-Scope Access to allow your app permission to access the sys_attachment table and related resources, avoiding security restrictions.

This approach keeps your instance performant by managing attachment size transparently without hardcoded limits.
