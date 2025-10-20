# Email Template Debugger

## Overview
A powerful utility for ServiceNow developers to debug and preview email notifications in real-time. This tool helps visualize how email templates will render with different data contexts, test notification conditions, and troubleshoot email-related issues without sending actual emails.

## Features
- Live preview of email templates
- Variable substitution testing
- HTML/Plain text toggle view
- Attachment validation
- Template syntax checking
- Recipient list validation
- Condition script testing
- Email script debugging
- Performance metrics

## Requirements
- ServiceNow instance with admin access
- Notification management rights
- Script Include access
- Email administration rights

## Implementation Steps
1. Create a new Script Include using script.js
2. Set up the debugging page using debugger_page.js
3. Configure access controls
4. Import any required style sheets
5. Test with sample notifications

## Components

### Script Include
- Handles template processing
- Manages variable substitution
- Validates email scripts
- Processes attachments
- Checks recipient lists

### Debugging Interface
- Template preview panel
- Variable input section
- Script testing area
- Results display
- Error highlighting

## Usage Example
```javascript
var emailDebugger = new EmailTemplateDebugger();
var result = emailDebugger.debugTemplate({
    notificationId: 'sys_id_of_notification',
    testRecord: 'sys_id_of_test_record',
    recipientList: ['user1@example.com'],
    variables: {
        'incident.number': 'INC0010001',
        'incident.short_description': 'Test incident'
    }
});
```

## Features in Detail

### Template Analysis
- Syntax validation
- Missing variable detection
- Script error identification
- HTML structure verification
- CSS compatibility check

### Performance Monitoring
- Template processing time
- Script execution metrics
- Database query impact
- Attachment processing time
- Overall generation time

### Security Checks
- Recipient validation
- Domain verification
- Script injection prevention
- Attachment size validation
- Permission verification

### Debugging Tools
- Step-by-step template processing
- Variable resolution tracking
- Script execution logging
- Error stack traces
- Query optimization hints

## Best Practices
1. Always test with sample data first
2. Verify all variable substitutions
3. Check both HTML and plain text versions
4. Validate attachment handling
5. Test with different record types
6. Monitor performance metrics
7. Review security implications

## Error Handling
The debugger provides detailed error information for:
- Syntax errors in templates
- Missing or invalid variables
- Script execution failures
- Recipient list issues
- Attachment problems
- Permission errors

## Performance Considerations
- Cache frequently used templates
- Optimize script execution
- Batch process attachments
- Minimize database queries
- Use efficient variable substitution

## Security Notes
- Validate all input data
- Check recipient permissions
- Sanitize variable content
- Verify attachment types
- Monitor script execution

## Troubleshooting
Common issues and solutions:
1. Template not found
   - Verify notification sys_id
   - Check access permissions
2. Variable substitution fails
   - Confirm variable names
   - Check data types
3. Script errors
   - Review script syntax
   - Check variable scope
4. Attachment issues
   - Verify file permissions
   - Check size limits

## Extensions
The debugger can be extended with:
- Custom validation rules
- Additional preview formats
- New debugging tools
- Performance analyzers
- Security checkers