## Email Address Validation

This regular expression checks if the provided string matches the common pattern for email addresses.

**Please note that the code is based on ES2021, and as such, will not work in the global scope or scopes that are not ES2021 compatible.**

^[a-zA-Z0-9._%+-]+: Matches one or more characters that can be letters (both uppercase and lowercase), digits, dots, underscores, percent signs, or plus or hyphen signs at the start of the string.
@: Matches the "@" symbol.
[a-zA-Z0-9.-]+: Matches one or more characters that can be letters, digits, dots, or hyphens in the domain part of the email address.
\.: Matches a dot.
[a-zA-Z]{2,}$: Matches two or more letters at the end of the string, representing the top-level domain (TLD) of the email address.
