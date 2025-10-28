# Email Validation on Catalog UI

This file contains a client script that validates email addresses in the MRVS (Multi-Row Variable Set) field using a MutationObserver. The script ensures that duplicate email addresses are not allowed in the catalog.

## File Structure

- `/code-snippets/Catalog Client Script/MRVS Email Validation with Mutation Observer/EmailValidationOnCatalogUI.js`

## Description

The script observes changes in the MRVS field and validates the email addresses whenever a user attempts to add another email. If a duplicate email address is found, an error message is displayed, and the submit button is disabled.

## Usage

1. **onLoad Function**: This function initializes the MutationObserver to watch for changes in the MRVS field.
2. **validateUserDetails Function**: This function checks for duplicate email addresses in the MRVS field.

## How It Works

1. The `onLoad` function sets up a MutationObserver on the MRVS field.
2. When changes are detected, the `validateUserDetails` function is called to check for duplicate email addresses.
3. If duplicates are found, an error message is displayed, and the submit button is disabled.
