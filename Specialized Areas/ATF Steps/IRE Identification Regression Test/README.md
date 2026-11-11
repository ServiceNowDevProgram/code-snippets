# IRE Identification Regression Test

An ATF "Run Server Side Script" step that checks how the Identification and Reconciliation Engine (IRE) identifies computers. It catches changes that would let imports create duplicate CIs, for example after an upgrade or after someone edits the identification rules.

## What it checks

1. The same computer sent twice gives `INSERT`, then `UPDATE` or `NO_CHANGE` with the same sys_id, and only one CI exists.
2. A computer sent again under a new name is found by its serial number.
3. A computer with a different serial number becomes a new CI.
4. A computer without name, serial number or MAC address is rejected with `MISSING_MATCHING_ATTRIBUTES` instead of being inserted.

The step calls `sn_cmdb.IdentificationEngine.createOrUpdateCI()`, which is what integrations and import scripts use. ATF rolls back the CIs the test creates.

## Setup

1. Automated Test Framework > Tests > New. Give the test a name, for example "IRE identification: computers".
2. Add Test Step > Server > Run Server Side Script.
3. Paste the content of `atf_ire_identification.js` and save.
4. Run the test.

## Adjusting it

- `DATA_SOURCE` must be a choice value of `cmdb_ci.discovery_source`. Use the source your imports use, so the test runs through the same reconciliation rules.
- `CLASS_NAME` is `cmdb_ci_computer`. For servers or network gear, change the class and the attributes to what your identification rule for that class uses.
- The expectations describe the out-of-box hardware rule (serial number, then other attributes). If you changed the rules on purpose, change the expectations as well. The test then documents how identification is supposed to work on your instance.

## Tested

On a personal developer instance (release Brazil), with the test created in the global scope: all four specs passed, and ATF rolled back the CIs the test created. A first run of a test that had been created while a scoped application was selected failed the two count checks (see Requirements).

## Requirements

- The ATF step runs as the user who runs the test, who needs to be allowed to write CIs.
- Create the test in the global scope. A test that is created while a scoped application is selected runs in that scope, and with runtime access enforcement the read on `cmdb_ci_computer` is denied ("must declare a cross scope access privilege"), so the count checks fail.
- Server-side scripts in ATF use Jasmine 3.1, `jasmine.getEnv().execute()` at the end starts the specs.
- ES5 only, no ES2021 features.
