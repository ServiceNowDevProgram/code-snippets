# Update User Email Domain in ServiceNow

This script finds all users in the **`sys_user`** table whose email addresses contain an old domain (e.g. `bad_domain.com`) and replaces it with a new domain (e.g. `new_domain.com`) using **regular expressions**.

---

## Purpose

To bulk–update user email domains safely and efficiently without manual edits.

Example use case:
 When your organization migrates from `@bad_domain.com` to `@new_domain.com`, this script updates all users automatically.

---

## Example
| Old Email              | New Email              |
|-------------------------|------------------------|
| alice@bad_domain.com    | alice@new_domain.com   |
| bob@bad_domain.com      | bob@new_domain.com     |
| carol@bad_domain.com    | carol@new_domain.com   |

