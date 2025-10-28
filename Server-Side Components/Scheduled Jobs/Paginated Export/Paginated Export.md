# Paginated Export

ServiceNow (wisely) limits the number of rows allowed in an export. However, they do not provide a way to break up exports into multiple files if you need to export more than the limit. Run this script as a scheduled job or scheduled flow instead of doing a scheduled export if you need to export large data sets.
