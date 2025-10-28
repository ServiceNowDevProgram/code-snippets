# Conditional Field Selection with GlideQuery

This snippet demonstrates how to dynamically select different sets of fields based on conditions using GlideQuery. This pattern is useful when you need to optimize queries by selecting only the fields you actually need based on runtime conditions, or when building flexible APIs that return different data sets based on user permissions or preferences.

## Use Cases

- **Permission-based field selection**: Select different fields based on user roles or permissions
- **Performance optimization**: Only fetch expensive fields when needed
- **API flexibility**: Return different data sets based on request parameters
- **Conditional aggregations**: Include summary fields only when specific conditions are met

## Key Benefits

- **Reduced data transfer**: Only fetch the fields you need
- **Performance optimization**: Avoid expensive field calculations when unnecessary
- **Security**: Dynamically exclude sensitive fields based on permissions
- **Maintainable code**: Centralized logic for field selection patterns

## Examples Included

1. **Role-based field selection**: Different fields for different user roles
2. **Performance-optimized queries**: Conditional inclusion of expensive fields
3. **Dynamic field arrays**: Building field lists programmatically
4. **Chained conditional selection**: Multiple condition-based selections