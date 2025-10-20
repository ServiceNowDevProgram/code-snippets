This utility script helps ServiceNow administrators and content managers ensure the integrity and usability of hyperlinks embedded within knowledge articles. It scans article content to identify and classify links pointing to catalog items and other knowledge articles, providing detailed insights into:

Catalog Item Links: Detects and categorizes links as active, inactive, or not found.
Knowledge Article Links: Flags outdated articles based on workflow state and expiration (valid_to).
Non-Permalink KB Links: Identifies knowledge article links that do not follow the recommended permalink format (i.e., missing sysparm_article=KBxxxxxxx), even if they use kb_view.do.
The solution includes a Jelly-based UI that displays categorized results with direct links to the affected records, enabling quick remediation. It's ideal for improving content quality, ensuring consistent user experience, and maintaining best practices in knowledge management.

<img width="815" height="231" alt="image" src="https://github.com/user-attachments/assets/7a1d8947-077b-45cd-8b5a-a2bc8e4b50e8" />
