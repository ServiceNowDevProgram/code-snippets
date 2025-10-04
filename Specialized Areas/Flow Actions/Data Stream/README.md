# Pagination Setup for Data Stream Integration

This script is used to manage pagination for a Data Stream integration in ServiceNow.
Use this script to set pagination variables or manipulate variables extracted by XPath or JSON Path.

## Code Overview

The script calculates the next offset based on the current page's limit and offset, and determines whether or not to retrieve the next page of data based on the total count of records available.

### Key Variables:
- **`limit`**: The number of records to retrieve per page.
- **`offset`**: The starting point for the next page of records.
- **`getNextPage`**: A boolean flag indicating whether to continue fetching more pages.

### How it works:
- The script compares the `nextOffset` (calculated as `currentOffset + limit`) to the total number of records (`totalCount`).
- If the `nextOffset` is less than the `totalCount`, the `getNextPage` variable is set to `true` to fetch the next page.
- If there are no more records to fetch, the `getNextPage` variable is set to `false`.

This setup is particularly useful for handling large datasets in paginated API requests, ensuring efficient and scalable data retrieval.
