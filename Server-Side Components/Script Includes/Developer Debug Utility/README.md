# Developer Debug Utility (Controlled Logging)
Create a systemProperty - enable_debug_for_scripts (Boolean value)

# Overview
This utility provides a centralized, configurable debug logging mechanism for developers.  
Instead of using gs.info(), gs.log(), or gs.warn() - which create permanent logs in the system, developers can now log messages conditionally through a system property.

When the property 'enable_debug_for_scripts' is set to 'true', debug messages are logged; otherwise, all debug calls are ignored.  
This makes it ideal for debugging issues in Production without modifying code or flooding system logs.


# Objective
To provide a reusable, lightweight debugging utility that allows developers to:
- Enable/disable debug logs globally via a system property.  
- Avoid unnecessary system log entries when debugging is not needed.  
- Maintain clean, controlled, and consistent debug output across server-side scripts.
