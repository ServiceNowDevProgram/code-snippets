# IRE onBefore with Serial Number Cleansing

An onBefore transform script that sends each import set row through the Identification and Reconciliation Engine (IRE) instead of letting the transform map write into the CMDB directly. Before that, the serial number is cleansed, and placeholder serials are dropped.

## Why

A transform map that writes into `cmdb_ci_computer` coalesces on one field and skips the identification and reconciliation rules. Routing the row through the IRE means the same rules apply as for Discovery and Service Graph Connectors: an existing CI is updated, a new one is inserted, and reconciliation rules decide which source may change which field.

Serial numbers from inventory exports are often messy: lower case, spaces, or placeholders like `To be filled by O.E.M.` or `Default string`. The placeholders are the real problem, because the hardware identification rule uses the serial number. On a developer instance, a second computer with a different name, no MAC address and the serial `To be filled by O.E.M.` was identified as the first one (`UPDATE` with the first CI's sys_id). Sent without the serial number, the IRE inserted it as a new CI. Whether other attributes such as a MAC address prevent the match depends on the identifier entries of your hardware rule; this case was not tested.

## Files

- `SerialNumberCleanser.js`: Script Include. Drops placeholders with the same check Discovery uses (`SerialNumberManager.isValid()`, which applies the rules in the Invalid Serial Number table `dscy_invalid_serial`). Real serial numbers are trimmed, whitespace is removed and they are converted to upper case. VMware serials (`VMware-42 1a ...`) keep their spaces, because Discovery stores them that way. If `SerialNumberManager` is not available, a fallback is used, see Notes.
- `onBefore_ire.js`: onBefore transform script. Sets `ignore = true` first, so the transform map never writes the CI itself. Then it builds the IRE payload from the staging row, calls `sn_cmdb.IdentificationEngine.createOrUpdateCI()` and writes the outcome into the import row comment. IRE errors and script errors also go to the import log.

## Setup

1. Create a Script Include named `SerialNumberCleanser` (not client callable) with the content of `SerialNumberCleanser.js`.
2. Create a transform map from your staging table to `cmdb_ci_computer` (or the class you load). Field maps are not needed, the script builds the payload.
3. Add `onBefore_ire.js` as an onBefore transform script. Adjust `DATA_SOURCE`, `CLASS_NAME`, the column mapping in `FIELDS` and the columns in `SERIAL_COLUMN` and `SOURCE_KEY_COLUMN` to your staging table.
4. `DATA_SOURCE` must be a choice value of `cmdb_ci.discovery_source`. If you use reconciliation rules per source, add a choice for your import.
5. If your staging table has a stable key from the source system, put it into the column named in `SOURCE_KEY_COLUMN` (`u_source_id` by default). The script sends it as `sys_object_source_info`, and the next import finds the CI by this key first.

## Result

The import set row comment shows what happened, for example:

```
IRE INSERT d3502728faac17104097d09a1f3e7bc1
IRE NO_CHANGE d3502728faac17104097d09a1f3e7bc1
IRE INSERT 67502728f8ac17105f6a5037363c1cce | serial number "To be filled by O.E.M." ignored (placeholder)
IRE ERROR | MISSING_MATCHING_ATTRIBUTES: Invalid payload item for neighborhood, ...
```

The transform adds `;Row transform ignored by onBefore script` to each comment, because every row has `ignore = true`.

Rows with an IRE error are skipped like all other rows (state Ignored). The error code and message from the IRE are in the row comment and in the import log. To find them, filter the import set rows on Comment starts with `IRE ERROR`. The transform history counts these rows as ignored, not as errors.

The script does not set `error = true` for a failed row on purpose. In an onBefore script, `error = true` halts the transformation of the whole import set, so one row without identifying attributes would stop all rows after it. `ignore = true` only skips the current row.

## Tested

On a personal developer instance (release Brazil).

As a transform run: an import set with three rows, the middle one without name, serial number or MAC address. The first and the third row were inserted through the IRE with cleansed serial numbers, the middle row was skipped with `MISSING_MATCHING_ATTRIBUTES` in its comment and in the import log, and the transform ended as Complete. For comparison, with `error = true` for IRE errors the same import set stopped at the middle row ("transform stopped due to error") and the third row stayed Pending.

The script include and the onBefore logic were also run against the IRE for these five rows:

| Row | Serial in the source | Result |
|---|---|---|
| Notebook A | `oss test 0001 ` | INSERT, stored as `OSSTEST0001` |
| Notebook A again | `OSSTEST0001` | NO_CHANGE, same sys_id |
| Notebook B | `To be filled by O.E.M.` | INSERT, serial ignored |
| Notebook C | `To be filled by O.E.M.` | INSERT, a second CI (not merged with B) |
| Only an asset tag | – | error `MISSING_MATCHING_ATTRIBUTES` |

## Notes

- The out-of-box rules in `dscy_invalid_serial` catch `To be filled by O.E.M.`, `Default string`, `System Serial Number`, `N/A`, `0000000000` and similar values. On the test instance they did not catch `INVALID`, `O.E.M.` or `0`. Add rules there (types Is, Contains, Matches regular expression) instead of changing the script, then Discovery benefits as well.
- The fallback without `SerialNumberManager` is a short list in the script include plus a check for values made of one repeated character. It decides differently from `dscy_invalid_serial` in edge cases: it drops `0` and any other single character, which the out-of-box rules on the test instance kept, and it knows only the values in its list. Run `gs.info(typeof SerialNumberManager)` in Scripts - Background to see which path your instance uses (`function` means the Discovery check).
- ServiceNow also ships `CMDBTransformUtil`, which builds the IRE payload from the field maps. Building the payload in the script, as here, makes it easy to cleanse values first and to add `sys_object_source_info`.
- Cleanse the same way for every source that loads the same class. If one source sends `pf3abc12` and another `PF3 ABC12`, you get two serial numbers for one device.
- ES5 only, no ES2021 features.
