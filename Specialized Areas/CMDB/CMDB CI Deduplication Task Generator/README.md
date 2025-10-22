# CI Deduplication Task Generator

This repository contains a ServiceNow customization that enables users to create De-Duplicate Tasks for selected Configuration Items (CIs) directly from a list view using a UI Action.

When executed, the UI Action confirms the number of selected CIs, calls a Script Include via GlideAjax, and creates a Remediate Duplicate Task using CMDBDuplicateTaskUtils

### How It Works

* Allows users to select multiple CIs and trigger de-duplication in one click
* Automatically creates a De-Duplicate Task record using backend logic
* Displays confirmation dialogs for task creation and redirection
* Prevents duplicate task creation for CIs already linked to an open task
* Redirects to the created De-Duplicate Task record for quick review


### Dependencies

This script requires the `global.CMDBDuplicateTaskUtils` Script Include to be active in your instance.

### Configuration & Use

Creation of UI Action and asking confirmation of selected Records from List View by using GlideAjax
