# ServiceNow JavaScript Helpers

A set of lightweight JavaScript helper functions for use in ServiceNow Script Includes, Business Rules, and Client Scripts.  
No external dependencies, just pure JavaScript.  

---

## ✨ String Helpers (`stringHelpers.js`)

- `toSlug("Hello World!")` → `"hello-world"`
- `fromSlugToWords("hello-world")` → `"hello world"`
- `fromSlugToCompact("hello-world")` → `"helloworld"`
- `toUnderscoreCase("hello world")` → `"hello_world"`
- `capitalizeWords("hello world")` → `"Hello World"`
- `toUpperCase("hello")` → `"HELLO"`
- `toLowerCase("HELLO")` → `"hello"`
- `trimText("  hello  ")` → `"hello"`

---