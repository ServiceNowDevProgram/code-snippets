This script scans the description field of a record for patterns that resemble sensitive personal data and masks them to ensure privacy and compliance. It targets the following data types using regular expressions:

Credit Card Numbers: Detects both continuous digits (13–16 digits) and spaced/dashed formats (e.g., 1234-5678-9012-3456).
Social Security Numbers (SSNs): Matches the standard US format (XXX-XX-XXXX).
Phone Numbers: Identifies various formats including international and local styles.

If any of these patterns are found, the script replaces them with masked placeholders (e.g., ****-****-****-**** for credit cards) and updates the description field accordingly. It also logs messages to the system and displays info messages to notify users of the masking actions taken.
