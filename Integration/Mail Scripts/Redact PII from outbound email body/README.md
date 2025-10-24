# Redact PII from outbound email body

## What this solves
Notifications sometimes leak personal data into emails. This mail script replaces common identifiers in the email body with redacted tokens before send.

## Where to use
Notification or Email Script record, Advanced view, "Mail script" field. Invoke the function to get a safe body string and print it.

## How it works
- Applies regex patterns to the email text for emails, phone numbers, IP addresses, NI number style patterns, and 16-digit card-like numbers
- Replaces matches with descriptive placeholders
- Leaves HTML tags intact by operating on the plain text portion you pass in

## Configure
- Extend or tighten patterns for your organisation
- Toggle specific scrubs on or off in the config block

## References
- Email Scripts  
  https://www.servicenow.com/docs/bundle/zurich-platform-administration/page/administer/notification/reference/email-scripts.html
- Notifications  
  https://www.servicenow.com/docs/bundle/zurich-platform-administration/page/administer/notification/concept/c_EmailNotifications.html
