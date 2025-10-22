# Form Field Count

A background script that identifies forms with excessive field counts that may impact performance or trigger Health Scan warnings.

## Usage

1. Navigate to **System Definition → Scripts - Background**
2. Copy and paste the script content
3. (Optional) Modify `maxFields` variable to set your threshold (default: 30)
4. Click "Run script"

## What It Does

The script:
1. Queries all forms in the instance (`sys_ui_form`)
2. Iterates through each form's sections (`sys_ui_form_section`)
3. Counts fields in each section, excluding container elements (splits, section starts)
4. Reports only forms exceeding the configured threshold
5. Outputs form name and total field count to system logs

