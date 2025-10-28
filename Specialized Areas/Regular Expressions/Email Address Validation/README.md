# Email Address Validation

This project provides email validation functionality in pure JavaScript. It includes a refactored regex implementation that covers common RFC 5322 patterns and stricter domain rules.

---

## Refactored Email Validation (2025 Update)

The regex has been improved to handle edge cases in the local part, domain, and top-level domain (TLD).

### Key Features

- Supports letters, digits, and allowed special characters in the local part:  
  `!#$%&'*+/=?^_`{|}~-`
- Supports dots in the local part, but not consecutive dots.
- Supports quoted local parts, e.g., `"john.doe"@example.com`.
- Validates domain labels:
  - Letters, digits, and hyphens (`-`)
  - Labels cannot start or end with a hyphen
  - No consecutive dots
- Restricts TLD length to 2–63 characters.
- Supports IPv4/IPv6 literals in brackets, e.g., `user@[192.168.0.1]`.

### Example Usage

```js
const emailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:(?:\\[\x00-\x7f]|[^\\"\r\n])*)")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}|\[(?:(?:25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(?:25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}|[a-zA-Z0-9-]*[a-zA-Z0-9]:[^\]]+)\])$/;

function validateEmail(email) {
  return emailRegex.test(email);
}

const emails = [
  "example@email.com",
  "user.name+tag@example.co.uk",
  '"quoted.user"@example.com',
  "user@[192.168.1.1]",
  "user@-example.com",
  "user@example..com",
  "user@example-.com",
  "user@.example.com"
];

emails.forEach(email => {
  console.log(email, validateEmail(email) 
    ? "is valid" 
    : "is invalid");
});
