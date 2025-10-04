# Remove HTML Tags from a String in a Flow

## Use Case / Requirement
Normalize HTML-rich content such as email-derived descriptions by stripping markup before continuing through a Flow Designer action.

## Solution
Create a reusable subflow action that accepts an HTML string, removes all tags with a regular expression, and returns clean text ready for downstream logic.

## Implementation
1. Create a new custom Flow action with an input named htmlValue and an output named plainString.
2. Paste the contents of removeHtmlTags.js into the script step of the action.
3. Publish the action and invoke it in your flows wherever you need to sanitize user-provided HTML.

## Notes
- The regular expression removes any markup tag; adjust the pattern if you need to preserve specific tags.
- The script trims leading and trailing whitespace generated after stripping tags.
- Combine with HTML entity decoding if your inputs contain encoded characters.
