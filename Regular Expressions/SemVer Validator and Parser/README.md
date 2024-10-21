# Semantic Versioning (SemVer) Validator and Parser

This JavaScript module provides functionality to validate and parse Semantic Versioning (SemVer) strings, as well as compare SemVer versions. It uses a regular expression to ensure the SemVer format is correct and extracts various components of the version string.

## Features

- Validates SemVer strings according to the [Semantic Versioning 2.0.0](https://semver.org/) specification
- Parses SemVer strings into their constituent parts:
  - Major version
  - Minor version
  - Patch version
  - Pre-release identifiers
  - Build metadata
- Compares two SemVer strings

## Usage

```javascript
const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

function validateAndParseSemVer(version) {
  // ... (function implementation)
}

function compareSemVer(v1, v2) {
  // ... (function implementation)
}

// Example usage:
console.log(validateAndParseSemVer('1.2.3-alpha.1+build.123'));
// Output: {
//   valid: true,
//   major: 1,
//   minor: 2,
//   patch: 3,
//   prerelease: ['alpha', '1'],
//   buildmetadata: ['build', '123']
// }

console.log(compareSemVer('1.2.3', '1.2.4')); // Output: -1
console.log(compareSemVer('1.0.0-alpha', '1.0.0')); // Output: -1
```

## Note

This validator and parser adheres to the Semantic Versioning 2.0.0 specification. It handles the core SemVer format as well as pre-release and build metadata.