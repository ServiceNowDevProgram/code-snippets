# Asset CI Status Drift Check

A read-only background script that finds hardware assets whose CI has a different status than the asset-to-CI mapping says it should have.

## Why

ServiceNow keeps `alm_hardware.install_status` and the `install_status` of the linked CI in sync. Which asset status (and substatus) leads to which CI status is configured in the table `alm_asset_ci_state_mapping`. The sync runs in business rules, so every update that skips them breaks it without a trace, for example `setWorkflow(false)` in fix scripts or imports that write with business rules turned off. The result is a CMDB that says "Installed" for a laptop the asset record shows as "In stock", and reports that disagree depending on which table they use.

## How it works

1. Reads the active rows of `alm_asset_ci_state_mapping` with direction "Asset to configuration item" or "Both" into a lookup. Rows without a substatus apply to all substatuses.
2. Groups all assets that have a CI by asset status, substatus and `ci.install_status` in a single `GlideAggregate` query. That is one query no matter how many assets there are.
3. Compares each group with the expected CI status and prints every mismatch with a count and up to five asset tags.

It changes nothing.

## Usage

Run `asset_ci_status_drift.js` in Scripts - Background, or put the function into a scheduled script to watch the drift over time.

- `ASSET_TABLE`: `alm_hardware` by default.
- `EXTRA_QUERY`: an encoded query to limit the check, for example `company.name=ACME`.
- `SAMPLES`: how many asset tags to list per mismatch.

## Example output

From a personal developer instance (release Brazil) with the out-of-box demo data:

```
Asset/CI status drift on alm_hardware: 1091 assets with CI checked, 120 with a CI status that does not match the mapping, 0 with a status that has no mapping.
41 x asset In use (1): CI is (empty), expected Installed (1) | eg. P1000153, P1000109, P1000221, P1000222, P1000174
6 x asset In use (1): CI is In Stock (6), expected Installed (1) | eg. P22166, P22338, P22896, P22877, P1000047
70 x asset In stock (6) / Available (available): CI is (empty), expected In Stock (6) | eg. P1000183, P1000185, P1000125, P1000188, P1000118
1 x asset In stock (6) / Available (available): CI is Installed (1), expected In Stock (6) | eg. P1000028
1 x asset In stock (6) / Defective (defective): CI is (empty), expected Pending Repair (5) | eg. P1000117
1 x asset In stock (6) / Pending transfer (pending_transfer): CI is (empty), expected In Stock (6) | eg. P1000130
```

`CI is (empty)` means the linked CI has no `install_status`, or the reference points to a CI that no longer exists. On the test instance the CIs existed and had no status.

## Fixing the drift

The script only reports. Decide per group which side is right, then update the wrong side to the value from the mapping with business rules enabled, so the platform logic runs as it normally would. Avoid `setWorkflow(false)` for this, because that is how the drift usually starts.

## Notes

- Newer releases also sync `hardware_status` and `hardware_substatus` on `cmdb_ci_hardware` through `alm_hardware_state_mapping`. This script checks `install_status` only.
- `GlideAggregate` groups by the dot-walked field `ci.install_status`, which keeps the check fast on large tables.
- ES5 only, no ES2021 features.
