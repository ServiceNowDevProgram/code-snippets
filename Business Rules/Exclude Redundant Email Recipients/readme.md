# Exclude Redundant Email Recipients
### This business rule is designed to intercept new comment notifications and modify the recipients to mitigate redundant notifications in response to email replies that users were previously included on as a direct or copied recipient.

Initial Settings (modify as needed for your purposes)
- Table: sys_email
- Advanced: true
- When: before
- Insert: true
- Update: true
- Conditions:
  - Type > changes to > send-ready
  - Subject > contains > comment
