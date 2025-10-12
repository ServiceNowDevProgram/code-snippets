#!/usr/bin/env node

const { execSync } = require('child_process');

const allowedCategories = new Set([
  'Core ServiceNow APIs',
  'Server-Side Components',
  'Client-Side Components',
  'Modern Development',
  'Integration',
  'Specialized Areas'
]);

function resolveDiffRange() {
  if (process.argv[2]) {
    return process.argv[2];
  }

  const inCI = process.env.GITHUB_ACTIONS === 'true';
  if (!inCI) {
    return 'origin/main...HEAD';
  }

  const base = process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : 'origin/main';
  const head = process.env.GITHUB_SHA || 'HEAD';
  return `${base}...${head}`;
}

function getChangedFiles(diffRange) {
  let output;
  try {
    output = execSync(`git diff --name-only --diff-filter=ACMR ${diffRange}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (error) {
    console.error('Failed to collect changed files. Ensure the base branch is fetched.');
    console.error(error.stderr?.toString() || error.message);
    process.exit(1);
  }

  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function validateFilePath(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  const segments = normalized.split('/');

  // Check for invalid characters that break local file systems
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    // Check for trailing periods (invalid on Windows)
    if (segment.endsWith('.')) {
      return `Invalid folder/file name '${segment}' in path '${normalized}': Names cannot end with a period (.) as this breaks local file system sync on Windows.`;
    }

    // Check for trailing spaces (invalid on Windows)
    if (segment.endsWith(' ')) {
      return `Invalid folder/file name '${segment}' in path '${normalized}': Names cannot end with a space as this breaks local file system sync on Windows.`;
    }

    // Check for reserved Windows names
    const reservedNames = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'];
    const nameWithoutExt = segment.split('.')[0].toUpperCase();
    if (reservedNames.includes(nameWithoutExt)) {
      return `Invalid folder/file name '${segment}' in path '${normalized}': '${nameWithoutExt}' is a reserved name on Windows and will break local file system sync.`;
    }

    // Check for invalid characters (Windows and general file system restrictions)
    const invalidChars = /[<>:"|?*\x00-\x1F]/;
    if (invalidChars.test(segment)) {
      return `Invalid folder/file name '${segment}' in path '${normalized}': Contains characters that are invalid on Windows file systems (< > : " | ? * or control characters).`;
    }
  }

  if (!allowedCategories.has(segments[0])) {
    return null;
  }

  // Files must live under: Category/Subcategory/SpecificUseCase/<file>
  if (segments.length < 4) {
    return `Move '${normalized}' under a valid folder hierarchy (Category/Subcategory/Use-Case/your-file). Files directly inside '${segments[0]}' or its subcategories are not allowed.`;
  }

  return null;
}

function main() {
  const diffRange = resolveDiffRange();
  const changedFiles = getChangedFiles(diffRange);

  if (changedFiles.length === 0) {
    console.log('No relevant file changes detected.');
    return;
  }

  const problems = [];

  for (const filePath of changedFiles) {
    const issue = validateFilePath(filePath);
    if (issue) {
      problems.push(issue);
    }
  }

  if (problems.length > 0) {
    console.error('Folder structure violations found:');
    for (const msg of problems) {
      console.error(` - ${msg}`);
    }
    process.exit(1);
  }

  console.log('Folder structure looks good.');
}

main();
