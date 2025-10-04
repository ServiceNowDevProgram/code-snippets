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

**IMPORTANT**: The repository has been reorganized into major categories. All new contributions MUST follow this structure for PR approval.

Please follow this directory structure when organizing your code snippets:

- **Top-Level Categories**: These are fixed categories that represent major areas of ServiceNow development:
  - `Core ServiceNow APIs/` - GlideRecord, GlideAjax, GlideSystem, GlideDate, etc.
  - `Server-Side Components/` - Background Scripts, Business Rules, Script Includes, etc.
  - `Client-Side Components/` - Client Scripts, Catalog Client Scripts, UI Actions, etc.
  - `Modern Development/` - Service Portal, NOW Experience, GraphQL, ECMAScript 2021
  - `Integration/` - RESTMessageV2, Import Sets, Mail Scripts, MIDServer, etc.
  - `Specialized Areas/` - CMDB, ITOM, Performance Analytics, ATF Steps, etc.

- **Sub-Categories**: Each top-level category contains sub-folders for specific ServiceNow technologies or use cases.
- **Snippet Folders**: Each sub-category contains folders for **each code snippet**.
- **Snippet Folder Contents**: Within each snippet folder, include:
  - A `README.md` file that describes the code snippet.
  - Individual files for each variant of the code snippet.

### New Structure Example

```
Core ServiceNow APIs/
  ├── GlideRecord/
  │   ├── Query Performance Optimization/
  │   │   ├── README.md         # Description of the optimization snippet
  │   │   ├── basic_query.js    # Basic query example
  │   │   └── optimized_query.js # Performance-optimized version
  │   └── Reference Field Handling/
  │       ├── README.md         # Description of reference handling
  │       └── reference_query.js # Reference field query example
  └── GlideAjax/
      ├── Async Data Loading/
      │   ├── README.md         # Description of async loading
      │   ├── client_script.js  # Client-side implementation
      │   └── script_include.js # Server-side Script Include
Server-Side Components/
  ├── Business Rules/
  │   ├── Auto Assignment Logic/
  │   │   ├── README.md         # Description of auto assignment
  │   │   └── assignment_rule.js # Business rule implementation
```

### Category Placement Guidelines

- **Core ServiceNow APIs**: All Glide* APIs and core ServiceNow JavaScript APIs
- **Server-Side Components**: Code that runs on the server (Business Rules, Background Scripts, etc.)
- **Client-Side Components**: Code that runs in the browser (Client Scripts, UI Actions, etc.)
- **Modern Development**: Modern ServiceNow development approaches and frameworks
- **Integration**: External system integrations, data import/export, and communication
- **Specialized Areas**: Domain-specific functionality (CMDB, ITOM, Testing, etc.)

## Final Checklist

Before submitting your pull request, ensure that:
- All code snippet files are in the appropriate folders.
- Each folder is correctly placed within its category.
- Your code snippet is accompanied by a `readme.md` file that describes it.

Thank you for contributing! Your efforts help create a richer resource for the ServiceNow development community.
