# AGENTS.md

This file provides guidance to AI Coding Agents when working with code in this repository.

## Repository Overview

This is the **ServiceNow Developer Program's Code Snippets Repository** - a community-driven collection of ServiceNow development code examples and utilities. The repository contains 900+ code snippets organized into 50+ categories covering all aspects of ServiceNow platform development.

## Repository Structure and Organization

### Directory Structure
All code snippets follow a standardized four-level structure:
```
Top-Level Category/
├── Sub-Category/
│   ├── Specific-Use-Case/
│   │   ├── README.md           # Description and usage instructions
│   │   ├── script.js           # Main code implementation
│   │   └── variant.js          # Optional code variations
```

### Top-Level Categories (REQUIRED Structure)
The repository is organized into **6 major categories**. All contributions MUST use these categories:

- **Core ServiceNow APIs/**: Essential ServiceNow JavaScript APIs
  - `GlideRecord/`, `GlideAjax/`, `GlideSystem/`, `GlideDate/`, `GlideDateTime/`, `GlideElement/`, `GlideFilter/`, `GlideAggregate/`, `GlideHTTPRequest/`, `GlideModal/`, `GlideQuery/`, `GlideTableDescriptor/`

- **Server-Side Components/**: Server-executed code
  - `Background Scripts/`, `Business Rules/`, `Script Includes/`, `Script Actions/`, `Scheduled Jobs/`, `Transform Map Scripts/`, `Server Side/`, `Inbound Actions/`, `Processors/`

- **Client-Side Components/**: Browser-executed code
  - `Client Scripts/`, `Catalog Client Script/`, `UI Actions/`, `UI Scripts/`, `UI Pages/`, `UI Macros/`, `UX Client Scripts/`, `UX Client Script Include/`, `UX Data Broker Transform/`

- **Modern Development/**: Modern ServiceNow frameworks
  - `Service Portal/`, `Service Portal Widgets/`, `NOW Experience/`, `GraphQL/`, `ECMASCript 2021/`

- **Integration/**: External systems and data exchange
  - `Integration/` (original), `RESTMessageV2/`, `Import Set API/`, `Scripted REST Api/`, `Mail Scripts/`, `MIDServer/`, `Attachments/`

- **Specialized Areas/**: Domain-specific functionality
  - `CMDB/`, `ITOM/`, `Performance Analytics/`, `ATF Steps/`, `Agile Development/`, `Advanced Conditions/`, `Browser Bookmarklets/`, `Browser Utilities/`, `Dynamic Filters/`, `Fix scripts/`, `Flow Actions/`, `Formula Builder/`, `Notifications/`, `On-Call Calendar/`, `Record Producer/`, `Regular Expressions/`, `Styles/`

## Development Guidelines

### Code Quality Standards
- Each snippet must include comprehensive README.md documentation
- Code should be relevant to ServiceNow developers
- ES2021 features are allowed but should be clearly documented
- Examples should expand meaningfully on official ServiceNow documentation
- Quality over quantity - low-effort submissions are rejected

### Contribution Requirements
- **Mandatory Category Structure**: All contributions MUST use the 6 top-level categories. PRs with incorrect structure will be rejected.
- **Descriptive Structure**: Changes must match pull request scope exactly
- **No XML Exports**: Avoid ServiceNow record exports in favor of JavaScript code
- **Documentation**: Every code snippet requires accompanying README.md
- **Proper Categorization**: Place snippets in appropriate existing sub-categories within the required top-level structure

### File Organization
- Use descriptive folder names that clearly indicate functionality
- Group related code variations in the same folder
- Include screenshots or examples when helpful for understanding
- Maintain consistent naming conventions across similar snippets

## Common ServiceNow Development Patterns

### GlideRecord Usage
- Most snippets demonstrate proper GlideRecord query patterns
- Security considerations with ACL enforcement examples
- Performance optimization through proper query construction
- Reference field handling and relationship traversal

### Integration Patterns
- REST API consumption and production examples
- Authentication handling for external systems
- Data transformation and mapping utilities
- Error handling and logging best practices

### Business Logic Implementation
- Business Rules for event-driven processing
- Background Scripts for administrative tasks
- Client Scripts for form behavior and validation
- UI Actions for custom user interactions

## Testing and Validation

### Code Verification
- Test all code snippets in development environments before submission
- Validate against multiple ServiceNow versions when possible
- Consider security implications and access controls
- Document any prerequisites or dependencies

### Community Review Process
- All contributions undergo peer review by Developer Advocates
- Changes outside described scope result in rejection
- Multiple submissions require separate branches in forked repositories

## Security Considerations

- Never include sensitive information (passwords, API keys, tokens)
- Consider security implications of all code examples
- Demonstrate proper access control patterns where applicable
- Include warnings for potentially dangerous operations

## Repository Maintenance

### Branch Management
- Main branch contains all approved code snippets
- Use descriptive branch names for contributions
- Create separate branches for different feature additions

### File Management
- No build processes or compilation required
- Direct GitHub editing supported
- Git-enabled IDEs like VS Code recommended for larger contributions
- Standard .gitignore excludes only .DS_Store files

This repository serves as a comprehensive reference for ServiceNow developers at all skill levels, emphasizing practical, tested solutions for real-world development scenarios.
