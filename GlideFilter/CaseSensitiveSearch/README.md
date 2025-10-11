# ServiceNow Fix Script: Normalize "prod" Environment Using GlideFilter

## Problem Statement

In many ServiceNow environments, custom fields like `u_environment` on tables such as `change_request` often contain inconsistent variants of the same logical value, for example: `prod`, `PROD`, `Prod`,`PrOd`, `pRoD` etc.

These inconsistencies cause:
- Bad or inconsistent reports
- Broken automation rules like BR or flow with condition
- And, Poor data hygiene or dirty values

---

## Solution: Fix Script or Background Script Using GlideFilter

We use **`GlideFilter`** with **case-sensitive matching** to securely identify inconsistent values to avoid multiple `if` conditions or regular expressions.

---

## Example

Instead of writing custom logic with if statement like this:

```javascript
var env = gr.u_environment.toString().toLowerCase();
if (env === 'prod' || env === 'prod ' || env === 'PROD' || env === 'PrOd') {
    // Normalize
}
```

You can simply write:
```javascript
var filter = new GlideFilter('u_environment=prod', 'envNormalize');
filter.setCaseSensitive(false);
if (filter.match(gr, true)) {
    // Normalize
}
```

## **How to Use**
1. Go to **Scripts - Background** or **Fix Scripts**.
2. Define the script using above glidefilter example shared.
3. Click **Run Script**.
