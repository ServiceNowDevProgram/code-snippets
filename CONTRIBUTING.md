# How to Contribute

We welcome contributions to the **ServiceNow Developer Program's Code Snippets Repository**! Follow these steps to get involved:

## Steps to Contribute

1. **Fork the Repository**: Click the "Fork" button on the top right of this page to create your own copy of the repository.

2. **Create a New Branch**: 
   - Name your branch according to the functionality you are adding (e.g., `feature/new-snippet` or `bugfix/fix-issue`).
   - Switch to your new branch from the main branch dropdown.

3. **Add or Edit Code Snippets**:
   - Navigate to the appropriate folders and files to add, edit, or reorganize code snippets.
   - Commit your changes to your forked repository.

4. **Submit a Pull Request**:
   - Go to the original repository and click on the "Pull Requests" tab.
   - Click "New Pull Request" and select your branch.
   - Ensure your pull request has a descriptive title and comment that outlines what changes you made.
   - Only include files relevant to the changes described in the pull request title and description.
   - Avoid submitting XML exports of ServiceNow records.

That's it! A Developer Advocate or a designated approver from the ServiceNow Dev Program will review your pull request. If approved, it will be merged into the main repository for everyone's benefit!

### Note on Multiple Submissions
If you plan to submit another pull request while your original is still pending, make sure to create a new branch in your forked repository first.

## General Requirements

- **Descriptive Pull Request Titles**: Your pull request must have explicit and descriptive titles that accurately represent the changes made.
- **Scope Adherence**: Changes that fall outside the described scope will result in the entire pull request being rejected.
- **Quality Over Quantity**: Low-effort or spam pull requests will be marked accordingly.
- **Expanded Snippets**: Code snippets reused from the [ServiceNow Documentation](https://docs.servicenow.com/) or [API References](https://developer.servicenow.com/dev.do#!/reference/) are acceptable only if they are expanded in a meaningful way (e.g., with additional context, documentation, or variations). Remember: *“QUANTITY IS FUN, QUALITY IS KEY.”*
- **Relevance**: Code should be relevant to ServiceNow Developers.
- **ES2021 Compatibility**: While ES2021 is allowed, we encourage you to disclose if your code is using ES2021 features, as not everyone may be working with ES2021-enabled applications.

## Repository Structure

Please follow this directory structure when organizing your code snippets:

- **Top-Level Folders**: These should represent categories of snippets (e.g., `fruits`, `vegetables`).
- **Sub-Folders**: Each top-level folder should contain a sub-folder for **each code snippet**.
- **Snippet Folder Contents**: Within each sub-folder, include:
  - A `readme.md` file that describes the code snippet.
  - Individual files for each variant of the code snippet.

### Example Structure

```
.github
fruits
  ├── apples
  │   ├── readme.md         # Description of the apples code snippet
  │   ├── apples.js         # First code snippet for apples
  │   └── fijiapples.js     # Variation of the apples snippet
  └── kiwi
      ├── readme.md         # Description of the kiwi code snippet
      └── kiwi.js           # Code snippet for kiwi
vegetables
  ├── carrots
  │   ├── readme.md         # Description of the carrots code snippet
  │   └── carrots.js        # Code snippet for carrots
  └── potatoes
      ├── readme.md         # Description of the potatoes code snippet
      ├── potatoes.js       # Original code snippet for potatoes
      ├── yukongoldpotato.js # Variant for Yukon Gold potatoes
      └── tatertots.js      # Variant for tater tots
```

## Final Checklist

Before submitting your pull request, ensure that:
- All code snippet files are in the appropriate folders.
- Each folder is correctly placed within its category.
- Your code snippet is accompanied by a `readme.md` file that describes it.

Thank you for contributing! Your efforts help create a richer resource for the ServiceNow development community.
