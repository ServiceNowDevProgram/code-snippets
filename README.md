![Code Snippets Banner](https://github.com/ServiceNowDevProgram/code-snippets/assets/31702109/f9fa072a-4c0c-426b-8eed-200c6616ff60)

<div align="center">

[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-Participating-orange?style=flat-square)](https://github.com/ServiceNowDevProgram/Hacktoberfest)

</div>

# ServiceNow Code Snippets Repository

Welcome to ServiceNow's Code Snippets community repository, managed by the Developer Program and the sndevs Slack community.

Inside this repository, you will find community submitted code-snippets and their variants for different use-cases.

**[📝 Contribution Guidelines](CONTRIBUTING.md)** | **[📚 Browse Categories](#repository-organization)** | **[🔍 How to Use](#how-to-use-this-repository)**

> Interested in our other ServiceNow Hacktoberfest projects? See the main repository [here](https://github.com/ServiceNowDevProgram/Hacktoberfest) or see our official blog post [here](https://devlink.sn/hacktoberfest).

**Note:** ServiceNowDevProgram has many repositories that can be imported directly into ServiceNow, this is not one of them; This repository is meant to be edited directly in GitHub or any other Git-enabled IDE like VS Code.

## Disclaimer

Please note the following:

1. **Community-Sourced Code**: The code found in this repository is contributed by members of the community and has not been vetted or officially endorsed by the repository owners.

2. **Use at Your Own Risk**: Users are advised to exercise caution and thoroughly review the code before implementing it in their ServiceNow instances. We strongly recommend a comprehensive review to ensure the code aligns with your specific requirements and security standards.

3. **Reporting Mistakes and Issues**: If you come across any mistakes, issues, or improvements in the code, we encourage you to report them and consider contributing to the repository by submitting corrections or enhancements.

4. **No Warranty or Support**: This repository is provided as-is, without any warranties or guarantees. It does not come with official support from the ServiceNow team or the repository owners.

By using the code from this repository, you acknowledge that you have read and understood this disclaimer. Your use of the code is at your own discretion and risk.

We appreciate your participation and contributions to this community-driven project. Let's collaborate to make it a valuable resource for ServiceNow developers and enthusiasts.

🔔🔔🔔<br>
**_CONTRIBUTORS must follow all guidelines in [CONTRIBUTING.md](CONTRIBUTING.md)_** or run the risk of having your Pull Requests labeled as spam.<br>
🔔🔔🔔

## Table of Contents

- [How to Use This Repository](#how-to-use-this-repository)
- [Repository Organization](#repository-organization)
- [Finding Snippets](#finding-snippets)
- [Folder Structure](#folder-structure)
- [Contributing](#we-invite-you-to-contribute)
- [Disclaimer](#disclaimer)

## How to Use This Repository

This repository contains code snippets that you can use in your ServiceNow instance. Here's how to make the most of it:

1. **Browse by Category**: Navigate through the [six major categories](#repository-organization) to find snippets relevant to your needs.
2. **Copy and Adapt**: Once you find a useful snippet, copy the code and adapt it to your specific use case in your ServiceNow instance.
3. **Read the Documentation**: Each snippet folder contains a README.md file that explains how the snippet works and how to implement it.
4. **Search by Topic**: Use GitHub's search functionality to find snippets by keywords (e.g., "GlideRecord", "REST", "UI Action").
5. **Contribute Your Own**: If you have a useful snippet, consider [contributing](#we-invite-you-to-contribute) to help others.

## Repository Organization

The repository is organized into **6 major categories** that cover all aspects of ServiceNow development:

### 📚 [Core ServiceNow APIs](Core%20ServiceNow%20APIs/)
Essential ServiceNow JavaScript APIs and classes including GlideRecord, GlideAjax, GlideSystem, GlideDate, GlideDateTime, and other foundational APIs.

### ⚙️ [Server-Side Components](Server-Side%20Components/)
Server-side code including Background Scripts, Business Rules, Script Includes, Scheduled Jobs, Transform Map Scripts, and other server-executed components.

### 🖥️ [Client-Side Components](Client-Side%20Components/)
Client-side code including Client Scripts, Catalog Client Scripts, UI Actions, UI Scripts, UI Pages, and UX framework components.

### 🚀 [Modern Development](Modern%20Development/)
Modern ServiceNow development approaches including Service Portal, NOW Experience Framework, GraphQL implementations, and ECMAScript 2021 features.

### 🔗 [Integration](Integration/)
External system integrations, data import/export utilities, RESTMessageV2 examples, Mail Scripts, MIDServer utilities, and attachment handling.

### 🎯 [Specialized Areas](Specialized%20Areas/)
Domain-specific functionality including CMDB utilities, ITOM scripts, Performance Analytics, ATF Steps, Agile Development tools, and other specialized use cases.

## Finding Snippets

There are several ways to find the snippets you need:

1. **By Category**: Browse the six major categories listed above.
2. **By Search**: Use GitHub's search functionality with keywords like:
   - API names: `GlideRecord`, `GlideSystem`, `GlideAjax`
   - Component types: `Business Rule`, `Client Script`, `UI Action`
   - Functionality: `REST`, `SOAP`, `Import`, `Export`
   - Use cases: `Authentication`, `Notification`, `Workflow`

3. **By Tags**: Many snippets include common keywords in their README files that can be searched.

## Folder Structure

The repository follows a consistent structure to make navigation easier:

```
Top-Level Category/
  ├── Sub-Category/
  │   ├── Specific Snippet/
  │   │   ├── README.md         # Description and usage instructions
  │   │   ├── snippet_file.js   # The actual code snippet
  │   │   └── variant.js        # Variations of the snippet (if applicable)
```

For example:
```
Core ServiceNow APIs/
  ├── GlideRecord/
  │   ├── Query Performance Optimization/
  │   │   ├── README.md
  │   │   ├── basic_query.js
  │   │   └── optimized_query.js
```

## We invite you to contribute!

We welcome contributions from the ServiceNow developer community! Your knowledge and experience can help others solve common challenges.

## 🌐 Contribute from the Web (No Setup Needed!)

This repository has been approved by Hacktoberfest in spirit of learning source control and getting started in your open-source journey. You can contribute directly from your browser without needing a ServiceNow instance:

1. Click **Fork** at the top-right corner of this page
2. Open the folder where you want to add or edit a file
3. Click **Add file → Create new file** (or edit an existing one)
4. Scroll down, add a **commit message**, and select  
   > "**Create a new branch for this commit and start a pull request**"
5. Click **Propose changes → Create pull request**

That's it! **For detailed contribution instructions, please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide before submitting.**

### What makes a good contribution?

- **Useful snippets** that solve common ServiceNow development challenges
- **Well-documented code** with clear comments explaining how it works
- **Proper organization** following the repository structure
- **Variations** of snippets for different use cases when applicable

## Leaderboard

Looking for the old leaderboard? We've moved the leaderboard to the overarching [Hacktoberfest](https://github.com/ServiceNowDevProgram/Hacktoberfest#leaders) repository and have expanded its scope to all participating projects.
