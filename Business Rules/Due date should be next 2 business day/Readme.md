To ensure that the Due Date is set to the next business day using a server-side script in ServiceNow, you can utilize the GlideDateTime and GlideBusinessCalendar APIs.
You can place this script in a Business Rule that runs before or after an insert/update, depending on your use case.
Make sure to test this logic thoroughly, especially around weekends and holidays, as the business calendar may vary by your organization's configuration.
