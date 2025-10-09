# Dynamic Field Dependencies with GlideAjax

This folder contains advanced Client Script examples demonstrating real-time field dependencies using GlideAjax for server-side data retrieval, cascading dropdowns, and dynamic form behavior.

## Overview

Modern ServiceNow forms often require dynamic behavior based on user selections. This example demonstrates:
- **Real-time field updates** using GlideAjax for server-side queries
- **Cascading dropdown menus** that filter based on parent selections
- **Conditional field visibility** based on complex business logic
- **Debouncing** to prevent excessive server calls
- **Loading indicators** for better user experience
- **Error handling** for failed AJAX calls
- **Performance optimization** with caching and batching

## Script Descriptions

- **dynamic_category_subcategory.js**: Client Script implementing cascading category/subcategory dropdowns with real-time filtering.
- **conditional_field_loader.js**: Advanced example showing conditional field loading based on multiple dependencies.
- **ajax_script_include.js**: Server-side Script Include (Client Callable) that provides data for the client scripts.
- **debounced_field_validator.js**: Real-time field validation with debouncing to reduce server load.

## Key Features

### 1. GlideAjax Communication
Efficient client-server communication:
```javascript
var ga = new GlideAjax('MyScriptInclude');
ga.addParam('sysparm_name', 'getSubcategories');
ga.addParam('sysparm_category', categoryValue);
ga.getXMLAnswer(callback);
```

### 2. Cascading Dropdowns
Dynamic filtering of child fields:
- Parent field change triggers child field update
- Child options filtered based on parent selection
- Multiple levels of cascading supported
- Maintains previously selected values when possible

### 3. Debouncing
Prevents excessive server calls:
- Waits for user to stop typing before making request
- Configurable delay (typically 300-500ms)
- Cancels pending requests when new input received
- Improves performance and user experience

### 4. Loading Indicators
Visual feedback during AJAX calls:
- Shows loading spinner or message
- Disables fields during data fetch
- Clears loading state on completion or error
- Prevents duplicate submissions

## Use Cases

- **Category/Subcategory Selection**: Filter subcategories based on selected category
- **Location-Based Fields**: Update city/state/country fields dynamically
- **Product Configuration**: Show/hide fields based on product type
- **Assignment Rules**: Dynamically populate assignment groups based on category
- **Cost Estimation**: Calculate and display costs based on selections
- **Availability Checking**: Real-time validation of resource availability
- **Dynamic Pricing**: Update pricing fields based on quantity/options

## Implementation Requirements

### Client Script Configuration
- **Type**: onChange (for field changes) or onLoad (for initial setup)
- **Table**: Target table (e.g., incident, sc_req_item)
- **Field**: Trigger field (e.g., category)
- **Active**: true
- **Global**: false (table-specific for better performance)

### Script Include Configuration
- **Name**: Descriptive name (e.g., CategoryAjaxUtils)
- **Client callable**: true (REQUIRED for GlideAjax)
- **Active**: true
- **Access**: public or specific roles

### Required Fields
Ensure dependent fields exist on the form:
- Add fields to form layout
- Configure field properties (mandatory, read-only, etc.)
- Set up choice lists for dropdown fields

## Performance Considerations

### Optimization Techniques
1. **Cache responses**: Store frequently accessed data client-side
2. **Batch requests**: Combine multiple queries into single AJAX call
3. **Minimize payload**: Return only required fields
4. **Use indexed queries**: Ensure server-side queries use indexed fields
5. **Debounce input**: Wait for user to finish typing
6. **Lazy loading**: Load data only when needed

### Best Practices
- Keep Script Includes focused and single-purpose
- Validate input parameters server-side
- Handle errors gracefully with user-friendly messages
- Test with large datasets to ensure performance
- Use browser developer tools to monitor network calls
- Implement timeout handling for slow connections

## Security Considerations

### Input Validation
Always validate parameters server-side:
```javascript
// BAD: No validation
var category = this.getParameter('sysparm_category');
var gr = new GlideRecord('cmdb_ci_category');
gr.addQuery('parent', category); // SQL injection risk

// GOOD: Validate and sanitize
var category = this.getParameter('sysparm_category');
if (!category || !this._isValidSysId(category)) {
    return '[]';
}
```

### Access Control
- Respect ACLs in Script Includes
- Use GlideRecordSecure when appropriate
- Don't expose sensitive data to client
- Implement role-based filtering

### XSS Prevention
- Sanitize data before displaying
- Use g_form.setValue() instead of innerHTML
- Validate choice list values
- Escape special characters

## Error Handling

### Client-Side
```javascript
ga.getXMLAnswer(function(response) {
    if (!response || response === 'error') {
        g_form.addErrorMessage('Failed to load data. Please try again.');
        return;
    }
    // Process response
});
```

### Server-Side
```javascript
try {
    // Query logic
} catch (ex) {
    gs.error('Error in getSubcategories: ' + ex.message);
    return 'error';
}
```

## Testing Checklist

- [ ] Test with empty/null values
- [ ] Test with invalid input
- [ ] Test with large datasets (1000+ records)
- [ ] Test on slow network connections
- [ ] Test concurrent user interactions
- [ ] Test browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Test mobile responsiveness
- [ ] Verify ACL enforcement
- [ ] Check for console errors
- [ ] Monitor network tab for performance

## Browser Compatibility

Tested and compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- ServiceNow Mobile App

## Related APIs

- **GlideAjax**: Client-server communication
- **GlideForm (g_form)**: Form manipulation
- **GlideUser (g_user)**: User context
- **GlideRecord**: Server-side queries
- **JSON**: Data serialization

## Additional Resources

- ServiceNow Client Script Best Practices
- GlideAjax Documentation
- Client-Side Scripting API Reference
- Performance Optimization Guide
