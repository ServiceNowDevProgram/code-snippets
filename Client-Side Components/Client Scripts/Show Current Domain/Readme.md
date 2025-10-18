Domain Separation Current Domain Display
Overview
This functionality provides real-time awareness to users about the current selected domain within ServiceNow's Domain Separation framework. It displays an informational message on form load indicating the active domain context, helping prevent accidental configuration or data entry in the wrong domain.

Components
Script Include: DomainCheckUtil
Global, client-callable Script Include allowing client scripts to query the current domain name via GlideAjax.

Methods:
isCurrentDomain(domainSysId) — Checks if a given domain sys_id matches the current session domain.

Client Script
An onLoad client script configured globally on the Global table, set to true to load on all forms.
Calls the Script Include via GlideAjax to retrieve current domain name asynchronously.

Displays the domain name as an informational message (g_form.addInfoMessage) on the form header on every page load.

Usage
Upon loading any record form, users see a message stating:
"You are currently working in Domain Separation domain: [domain_name]."
