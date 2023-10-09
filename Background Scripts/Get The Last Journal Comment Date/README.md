# Timestamp Extraction from Comment

## Overview

This code snippet demonstrates how to extract a timestamp from a comment text and create a `GlideDateTime` object from it. It's useful when you have comments with timestamps and need to work with the timestamp data within a ServiceNow instance.

## Code Explanation

- **Get Record**: The code starts by fetching a record from a `GlideRecord` with a specific sys_id. In this example, it fetches an incident record.

- **Get Latest Comment**: It retrieves the latest comment from the fetched record using `record.comments.getJournalEntry(1)`.

- **Timestamp Extraction**: The code uses regular expressions (`timestampMatch`) to search for a timestamp in the comment text. The regular expression `(\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}) -` is designed to match timestamps in the format "DD-MM-YYYY HH:MM:SS -".

- **Create `GlideDateTime`**: If a timestamp is found (`timestampMatch` is not null), it creates a `GlideDateTime` object (`parsedTimestamp`) from the matched timestamp.

- **Logging**: The code logs the parsed timestamp to the system logs using `gs.info()` if a timestamp is found. If no timestamp is found, it logs an error message.
