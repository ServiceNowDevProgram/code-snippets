# When getting a date from another table, it's usually in the format (YYYY-MM-DD). To display it in the user's preferred format on the client side, use the method below.

If date is fetched from a query(like GlideAjax), date returned from query pass that date object into "new Date()"

# Example

```
var user_date = formatDate(new Date(<returnDateObj>), g_user_date_format)

g_form.setValue('<field_name>',user_date);

```
