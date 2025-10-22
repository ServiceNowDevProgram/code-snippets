# Extract and Convert Date in a Text or String to GlideDate Format

## Use Case / Requirement
This script extracts a date from a string formatted as "20 Nov 2020" and converts it into the GlideDate format used in ServiceNow. This is particularly useful for maintaining accurate records of software patches and updates.

## Solution
The solution utilizes the `GlideDate` object to parse the date from the string and format it appropriately. The script extracts the day, month, and year, then constructs a formatted date string.

## Example Input and Output
- **Input Format**: Example string containing patch information
  - Example: `"kernel-headers-2.6.32-754.35.1.el6.x86_64 20 Nov 2020"`
- **Output Format**: 
  - GlideDate format: `2020-11-20` (if displayed in `yyyy-MM-dd` format)

## Code Snippet
Please find the attached javascript file to know how to implement it. Thank you!
