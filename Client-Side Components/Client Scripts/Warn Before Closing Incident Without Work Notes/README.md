# Warn Before Closing Incident Without Work Notes

## Overview
This Client Script prevents users from resolving or closing an Incident without adding work notes. It ensures that important resolution details are documented before the ticket is closed.

## Features
- Triggered on form submission.
- Checks if the Incident state is set to Resolved or Closed.
- Displays a warning if Work Notes are empty.
- Prevents form submission until notes are added.

## Configuration

- **Table**: `incident`
- **Type**: `onSubmit`
- **Script Name**: `Warn Before Closing Without Work Notes`
- **Active**: `true`

## Script


function onSubmit() {
    var state = g_form.getValue('state');
    var workNotes = g_form.getValue('work_notes');

    if ((state == '6' || state == '7') && !workNotes.trim()) {
        alert("Please add work notes before resolving or closing the Incident.");
        return false;
    }

    return true;
}
