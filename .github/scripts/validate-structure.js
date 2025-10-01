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
