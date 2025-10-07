Problem Statement
When a knowledge article saved in a user’s favorites is updated to a new version, the favorites section continues to display the older version, leading to potential misinformation and inefficiencies. To address this, a solution has been implemented that automatically updates the knowledge articles in users' favorites to the latest version whenever a new one is published. This removes the need for users to manually update their saved articles, ensuring they always have access to the most accurate and up-to-date information, thereby enhancing both user experience and operational efficiency.
How It Works
Triggering Event:

The Business Rule is configured to trigger when a knowledge article’s state changes to draft. This ensures that when the article enters the draft stage, the system will execute the rule to update any bookmarks saved by users.
Script Logic:

The script retrieves the sys_id and version information of the latest and the previous versions of the knowledge article from the kb_knowledge table.
It then searches the sys_ui_bookmark table for any URLs containing the sys_id of the previous version of the knowledge article.
If a match is found, the script updates the bookmark to point to the latest version of the article.
URL Construction:

The script constructs a new URL for the latest version using the sys_id of the latest article. This new URL is then updated in the bookmark record.
The updated URL ensures that when users access their favorites, they are redirected to the most recent version of the article.
Configuration
Business Rule Configuration:

The Business Rule should be created on the kb_knowledge table and configured to trigger when a knowledge article’s state is changed to draft.
This rule runs in the after phase, ensuring that once the state is set to draft, the rule checks for bookmarks that need to be updated.
Script Configuration:

The script retrieves the sys_id of both the latest and previous versions of the knowledge article.
It then queries the sys_ui_bookmark table for any bookmarks with a URL containing the second version's sys_id.
If a match is found, the bookmark's URL is updated to point to the latest version.
Testing
Test Scenario:

Create two versions of a knowledge article (i.e., KB001 V1 and KB001 V2).
Add the first version (V1) to your favorites in the Service Portal.
Ensure the sys_ui_bookmark table contains a bookmark with the sys_id of the first version.
Business Rule Trigger:

Update the second version of the article and transition it to draft state.
This triggers the Business Rule and executes the script.
Verify Bookmark Update:

Check the sys_ui_bookmark table to confirm that the URL has been updated from V1’s sys_id to V2’s sys_id.
In the Service Portal, verify that the saved favorite now points to the latest version (V2) of the article.
Edge Case Testing:

Test the scenario when there’s no previous version of the knowledge article (i.e., the article is on its first version) to ensure the script doesn’t fail.
Test when no bookmark exists to ensure the script completes without errors.
Benefits
Automatic Version Control:

Users are automatically directed to the latest version of a knowledge article, ensuring they always have access to up-to-date information.
Improved Knowledge Accuracy:

Prevents users from accessing and relying on outdated information, reducing the risk of misinformation and errors.
Enhanced User Experience:

This functionality improves the user experience by keeping their saved favorites always up to date, without requiring manual updates.
Operational Efficiency:

Administrators and content managers save time by eliminating the need for manual bookmark updates when a new version of an article is published.
Scalability:

The solution is scalable, meaning it can be applied across all knowledge articles in the system, and can also be adapted to other record types or systems that rely on version control.
Conclusion
This solution ensures that knowledge articles saved as favorites by users in the Service Portal are always updated to reflect the most recent version. By implementing this automatic update process, the organization can improve the reliability of its knowledge base, enhance user satisfaction, and reduce errors stemming from outdated information.
