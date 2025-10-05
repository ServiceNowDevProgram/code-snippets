# 🚀 ServiceNow Code Snippets Repository

<div align="center">

![Code Snippets Banner](https://github.com/ServiceNowDevProgram/code-snippets/assets/31702109/f9fa072a-4c0c-426b-8eed-200c6616ff60)

**A curated community-driven collection of ServiceNow code snippets and solutions**

[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-participating-orange.svg)](https://github.com/ServiceNowDevProgram/Hacktoberfest)
[![Community](https://img.shields.io/badge/community-sndevs-blue.svg)](https://sndevs.com)

Managed by the ServiceNow Developer Program and the sndevs Slack community

[Explore Snippets](#-repository-organization) • [How to Use](#-how-to-use-snippets) • [Contribute](#-contributing) • [Hacktoberfest](#-hacktoberfest)

</div>

---

## 📖 About

This repository serves as a comprehensive resource for ServiceNow developers of all skill levels. Whether you're looking for quick solutions, learning best practices, or sharing your expertise, you'll find a wealth of community-contributed code snippets organized by category and use case.

### ✨ What You'll Find

- **Practical Code Examples**: Real-world snippets solving common ServiceNow challenges
- **Multiple Variants**: Different approaches to similar problems for various use cases
- **Community-Driven**: Contributions from developers across the ServiceNow ecosystem
- **Organized Structure**: Easy navigation through 6 major categories covering all development aspects

> **Note**: This repository is designed for direct editing in GitHub or Git-enabled IDEs (like VS Code), not for direct import into ServiceNow instances.

> **Interested in our other ServiceNow Hacktoberfest projects?** See the main repository [here](https://github.com/ServiceNowDevProgram/Hacktoberfest) or our official blog post [here](https://devlink.sn/hacktoberfest).

---

## 📑 Table of Contents

- [About](#-about)
- [How to Use Snippets](#-how-to-use-snippets)
- [Repository Organization](#-repository-organization)
- [Finding Snippets by Topic](#-finding-snippets-by-topic)
- [Contributing](#-contributing)
- [Hacktoberfest](#-hacktoberfest)
- [Disclaimer](#%EF%B8%8F-disclaimer)
- [Community](#-community)

---

## 🔍 How to Use Snippets

### Browsing the Repository

1. **Navigate by Category**: Use the [Repository Organization](#-repository-organization) section below to find the category that matches your need
2. **Browse Folders**: Click through to specific folders to see available snippets
3. **Read Documentation**: Each snippet should include comments explaining its purpose and usage

### Using Snippets in ServiceNow

1. **Review the Code**: Always read and understand what the code does before using it
2. **Copy the Snippet**: Select and copy the code you need
3. **Paste into ServiceNow**: Navigate to the appropriate location in your ServiceNow instance:
   - **Background Script**: System Definition > Scripts - Background
   - **Business Rule**: System Definition > Business Rules
   - **Client Script**: System Definition > Client Scripts
   - **Script Include**: System Definition > Script Includes
   - *And so on...*
4. **Customize**: Modify the code to fit your specific requirements (table names, field names, logic, etc.)
5. **Test Thoroughly**: Always test in a sub-production environment first

### Best Practices

⚠️ **Important Security & Quality Steps:**

- ✅ **Always test in DEV/TEST** before deploying to production
- ✅ **Review for security vulnerabilities** and potential performance issues
- ✅ **Validate against your instance** requirements and customizations
- ✅ **Check ServiceNow version compatibility** - some APIs may differ across versions
- ✅ **Follow your organization's** change management process
- ✅ **Add proper error handling** appropriate for your use case

### Quick Tips

- Use your browser's search (Ctrl+F / Cmd+F) to find specific keywords within categories
- Check multiple variants of similar snippets to find the best fit for your needs
- Read the comments in the code for usage instructions and warnings
- Bookmark frequently used snippets for quick access

---

## 🗂️ Repository Organization

Navigate through **6 comprehensive categories** covering the entire ServiceNow development landscape:

### 📚 [Core ServiceNow APIs](Core%20ServiceNow%20APIs/)
Foundation of ServiceNow development
- **GlideRecord** - Database queries, inserts, updates, deletes
- **GlideAggregate** - Aggregate queries (COUNT, SUM, AVG, etc.)
- **GlideAjax** - Client-server asynchronous communication
- **GlideSystem** (gs) - System utilities, user info, logging
- **GlideDate & GlideDateTime** - Date/time manipulation
- **GlideUser** - User session information
- Essential JavaScript APIs and helper classes

### ⚙️ [Server-Side Components](Server-Side%20Components/)
Backend logic and automation
- **Background Scripts** - Ad-hoc server-side scripts
- **Business Rules** - Before, After, Async, Display rules
- **Script Includes** - Reusable server-side code libraries
- **Scheduled Jobs** - Automated recurring tasks
- **Event Scripts** - Event-driven automation
- **Transform Map Scripts** - Data import transformations
- **Data Policies & ACL Scripts** - Security and validation

### 🖥️ [Client-Side Components](Client-Side%20Components/)
User interface interactions
- **Client Scripts** - onChange, onLoad, onSubmit, onCellEdit
- **Catalog Client Scripts** - Service Catalog form behaviors
- **UI Actions** - Custom buttons and context menu items
- **UI Policies** - Dynamic form field behaviors
- **UI Scripts** - Reusable client-side libraries
- **UI Pages** - Custom HTML/JavaScript pages
- Form widgets and custom components

### 🚀 [Modern Development](Modern%20Development/)
Next-generation ServiceNow
- **Service Portal** - Widgets, server scripts, CSS, Angular
- **NOW Experience Framework** - UI Builder components
- **GraphQL** - API implementations and queries
- **ECMAScript 2021+** - Modern JavaScript features
- **Flow Designer** - Custom actions and subflows
- **Workspace** - App Engine Studio components

### 🔗 [Integration](Integration/)
External connectivity and data exchange
- **REST APIs** - RESTMessageV2 examples, OAuth
- **SOAP Integrations** - Web service calls
- **Data Import/Export** - CSV, Excel, XML utilities
- **Mail Scripts** - Email automation and templates
- **MIDServer Utilities** - Discovery and orchestration
- **Attachment Handling** - File upload/download operations
- Third-party API connections (Slack, Teams, etc.)

### 🎯 [Specialized Areas](Specialized%20Areas/)
Domain-specific solutions
- **CMDB Utilities** - Configuration item management
- **ITOM & Discovery** - Infrastructure automation
- **Performance Analytics** - Metrics and reporting
- **ATF (Automated Test Framework)** - Custom test steps
- **Agile Development** - Story and sprint management
- **Virtual Agent** - Chatbot topics and scripts
- **HR Service Delivery** - Employee workflows
- **Workspace Optimization** - Performance tuning

---

## 🏷️ Finding Snippets by Topic

### Popular Topics & Keywords

Use these keywords to search within categories:

**Data Operations**: `GlideRecord`, `query`, `insert`, `update`, `delete`, `aggregate`, `encoded query`

**User & Security**: `getUser`, `hasRole`, `ACL`, `security`, `authentication`, `authorization`

**Client-Server**: `GlideAjax`, `AJAX`, `client callable`, `asynchronous`

**Date & Time**: `GlideDateTime`, `GlideDate`, `date math`, `timezone`, `duration`

**UI Customization**: `UI Policy`, `UI Action`, `Client Script`, `catalog`, `form`

**Integrations**: `REST`, `SOAP`, `RESTMessageV2`, `API`, `webhook`, `external`

**Automation**: `Business Rule`, `scheduled job`, `event`, `workflow`, `flow`

**Performance**: `performance`, `optimization`, `caching`, `bulk operations`

**Notifications**: `email`, `notification`, `mail script`, `template`

**Reporting**: `report`, `dashboard`, `Performance Analytics`, `metrics`

### Search Tips

1. **Use GitHub Search**: Press `/` and search for keywords across the entire repository
2. **Filter by File Type**: Add `language:javascript` to your GitHub search
3. **Browse by Category**: Start with the most relevant category folder
4. **Check README Files**: Many category folders have their own README with indices

---

## 🤝 Contributing

We welcome and encourage contributions from developers at all experience levels!

### 🔔 Important
**CONTRIBUTORS must follow all guidelines in [CONTRIBUTING.md](CONTRIBUTING.md)** or run the risk of having your Pull Requests labeled as spam.

### Quick Start

1. **Fork** this repository (you earn a point just for forking! 🎉)
2. **Create** a new branch on your fork (`git checkout -b feature/my-snippet`)
3. **Add** your code snippet following our structure and guidelines
4. **Commit** with a clear, descriptive message
5. **Submit** a pull request with a detailed description

### What Makes a Good Contribution?

✅ **Well-Documented Code**
- Clear comments explaining what the code does
- Use case description
- Any prerequisites or dependencies
- Example usage

✅ **Proper Organization**
- Placed in the correct category folder
- Follows naming conventions
- Includes relevant metadata

✅ **Tested & Working**
- Code has been tested in a ServiceNow instance
- Specify which ServiceNow version(s) it works with
- Note any known limitations

✅ **Original or Improved**
- New snippets solving real problems
- Improved versions of existing snippets
- Different approaches to common challenges

### Contribution Guidelines Summary

📋 **Please read the complete [CONTRIBUTING.md](CONTRIBUTING.md) before submitting**

Key requirements:
- Follow the established folder structure
- Include clear documentation and inline comments
- Provide meaningful commit messages
- Test your code before submitting
- Respect existing code style and conventions
- Only submit code you have rights to share

---

## 🎃 Hacktoberfest

This repository is a proud participant in Hacktoberfest! 

### Get Involved

- 🌟 **Contribute** quality snippets and earn points
- 🏆 **Compete** on the leaderboard across all projects
- 🎁 **Earn** recognition in the community

### Resources

- 🔗 **Main Repository**: [ServiceNow Hacktoberfest Hub](https://github.com/ServiceNowDevProgram/Hacktoberfest)
- 📝 **Official Blog**: [Read about our participation](https://devlink.sn/hacktoberfest)
- 🏅 **Leaderboard**: [View top contributors](https://github.com/ServiceNowDevProgram/Hacktoberfest#leaders)

---

## ⚠️ Disclaimer

**Please read carefully before using code from this repository:**

### Community-Sourced Content

All code in this repository is:
- ✍️ Contributed by community members
- 🚫 **NOT** officially vetted or endorsed by ServiceNow
- 🚫 **NOT** officially supported by repository maintainers
- 📝 Provided for educational and reference purposes

### Use Responsibly

**Before implementing any code:**

- ✅ **Thoroughly review** and understand what the code does
- ✅ **Test extensively** in sub-production environments (DEV/TEST)
- ✅ **Validate** against your organization's security standards
- ✅ **Verify compatibility** with your ServiceNow version
- ✅ **Customize** for your specific requirements
- ✅ **Follow** your organization's change management process

### No Warranty or Support

This repository is provided **"AS-IS"** without any warranties, guarantees, or official support:

- ❌ No guarantee of code quality or security
- ❌ No warranty of fitness for any particular purpose
- ❌ No official support from ServiceNow or repository owners
- ❌ No liability for any damages or issues arising from use

### Your Responsibility

By using code from this repository, you:
- ✔️ Acknowledge you have read and understood this disclaimer
- ✔️ Accept full responsibility for testing and validating code
- ✔️ Agree to use code at your own discretion and risk
- ✔️ Understand that you are responsible for any consequences of implementation

### Community Support

While there's no official support, the community is here to help:

- 🐛 **Found a bug?** [Report it via Issues](../../issues)
- 💡 **Have an improvement?** [Contribute it](CONTRIBUTING.md)
- 💬 **Questions?** Join the [sndevs Slack community](https://sndevs.com)
- 🤝 **Need help?** Engage with other developers in discussions

We appreciate your participation and contributions to this community-driven project. Let's collaborate to make it a valuable resource for ServiceNow developers worldwide!

---

## 🌟 Community

### Join the Conversation

Connect with thousands of ServiceNow developers:

- 💬 **Slack**: [sndevs community](https://sndevs.com) - The largest ServiceNow developer community
- 🗨️ **Discussions**: Use GitHub Discussions to share ideas and ask questions
- 🐛 **Issues**: Report bugs, request features, or suggest improvements
- 🐦 **Social**: Follow the ServiceNow Developer Program on social media

### Recognition

Top contributors are recognized on our [Hacktoberfest Leaderboard](https://github.com/ServiceNowDevProgram/Hacktoberfest#leaders)!

### Stay Updated

- ⭐ **Star this repository** to receive updates about new snippets
- 👀 **Watch** the repository for notifications on new contributions
- 🔔 **Subscribe** to specific discussions you're interested in

---

## 📊 Repository Stats

![GitHub stars](https://img.shields.io/github/stars/ServiceNowDevProgram/code-snippets?style=social)
![GitHub forks](https://img.shields.io/github/forks/ServiceNowDevProgram/code-snippets?style=social)
![GitHub contributors](https://img.shields.io/github/contributors/ServiceNowDevProgram/code-snippets)
![GitHub last commit](https://img.shields.io/github/last-commit/ServiceNowDevProgram/code-snippets)

---

## 📜 License

This project's license terms are specified in the repository. Please check the LICENSE file for complete details.

---

## 🙏 Acknowledgments

Special thanks to:
- All our amazing contributors who share their knowledge
- The sndevs Slack community for their ongoing support
- The ServiceNow Developer Program team
- Every developer who uses and improves these snippets

---

<div align="center">

**Made with ❤️ by the ServiceNow Developer Community**

[Report Bug](../../issues) • [Request Feature](../../issues) • [View Leaderboard](https://github.com/ServiceNowDevProgram/Hacktoberfest#leaders) • [Join sndevs](https://sndevs.com)

⭐ Star this repo if you find it useful!

</div>
