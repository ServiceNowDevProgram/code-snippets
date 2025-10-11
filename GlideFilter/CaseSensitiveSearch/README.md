# 🔄 ServiceNow Fix Script: Normalize "prod" Environment Using GlideFilter

## 📌 Problem Statement

In many ServiceNow environments, custom fields like `u_environment` on tables such as `change_request` often contain inconsistent variants of the same logical value, for example:

- `prod`
- `PROD`
- `Prod`
- `PrOd`
- `pRoD`

These inconsistencies cause:
- Confusion in reports
- Broken automation rules
- Poor data hygiene

This script identifies and normalizes all case-variant values of `"prod"` to a consistent format: `"Prod"`.

---

## 🚀 Solution: Fix Script Using GlideFilter

We use **`GlideFilter`** with **case-sensitive matching** to cleanly and securely identify inconsistent values. This avoids multiple `if` conditions or regular expressions.

---

## ✅ Practical Example

Instead of writing custom logic like this:

```javascript
var env = gr.u_environment.toString().toLowerCase();
if (env === 'prod' || env === 'prod ' || env === 'PROD' || env === 'PrOd') {
    // Normalize
}
```

You simply write:
```javascript
var filter = new GlideFilter('u_environment=prod', 'envNormalize');
filter.setCaseSensitive(false);
if (filter.match(gr, true)) {
    // Normalize
}
```

✅ Cleaner
✅ ACL-aware
✅ Easier to maintain
✅ Consistent with UI filters

## GlideFilter Utility

🧠 **Why Use GlideFilter?**

| Feature                         | GlideFilter | Regex / If |
|---------------------------------|-------------|------------|
| Security-aware (ACLs)          | ✅ Yes      | ❌ No      |
| Case sensitivity toggle         | ✅ Yes      | ⚠️ Manual  |
| UI-like filter syntax           | ✅ Yes      | ❌ No      |
| Easy to read                    | ✅ Yes      | ❌ No      |
| Scalable & reusable             | ✅ Yes      | ❌ No      |
| Compound condition support       | ✅ Yes      | ⚠️ Complex to build |

💡 **Use Cases**
- Normalizing environment values (prod, dev, test)
- Standardizing priority or category values
- Filtering GlideRecords based on secure, compound conditions
- Any script where you're mimicking UI filter logic in code

🛠️ **How to Use**
1. Go to **System Definition** → **Scripts - Background**.
2. Paste the script above.
3. Click **Run Script**.
4. Check **System Logs** (gs.info) to verify updates.
