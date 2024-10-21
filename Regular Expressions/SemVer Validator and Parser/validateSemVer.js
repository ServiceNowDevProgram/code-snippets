// Semantic Versioning (SemVer) Validator and Parser

const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

function validateAndParseSemVer(version) {
  const match = semverRegex.exec(version);
  if (!match) {
    return null;
  }

  const [, major, minor, patch, prerelease, buildmetadata] = match;

  return {
    valid: true,
    major: parseInt(major, 10),
    minor: parseInt(minor, 10),
    patch: parseInt(patch, 10),
    prerelease: prerelease ? prerelease.split('.') : [],
    buildmetadata: buildmetadata ? buildmetadata.split('.') : []
  };
}

function compareSemVer(v1, v2) {
  const parsed1 = validateAndParseSemVer(v1);
  const parsed2 = validateAndParseSemVer(v2);

  if (!parsed1 || !parsed2) {
    throw new Error('Invalid SemVer string');
  }

  if (parsed1.major !== parsed2.major) {
    return parsed1.major - parsed2.major;
  }
  if (parsed1.minor !== parsed2.minor) {
    return parsed1.minor - parsed2.minor;
  }
  if (parsed1.patch !== parsed2.patch) {
    return parsed1.patch - parsed2.patch;
  }

  // Compare pre-release versions
  const pre1 = parsed1.prerelease.join('.');
  const pre2 = parsed2.prerelease.join('.');
  if (pre1 && !pre2) return -1;
  if (!pre1 && pre2) return 1;
  if (pre1 !== pre2) return pre1.localeCompare(pre2);

  return 0;
}

// Example usage:
console.log(validateAndParseSemVer('1.2.3-alpha.1+build.123'));
console.log(compareSemVer('1.2.3', '1.2.4'));
console.log(compareSemVer('1.0.0-alpha', '1.0.0'));