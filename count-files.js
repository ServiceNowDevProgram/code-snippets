#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Folders to exclude from counting
const EXCLUDED_FOLDERS = new Set([
    '.github',
    '.git', 
    'node_modules',
    '.vscode',
    '.idea',
    'assets'
]);

// Root files to exclude
const EXCLUDED_ROOT_FILES = new Set([
    'README.md',
    'CONTRIBUTING.md', 
    'CLAUDE.md',
    'PAGES.md',
    'LICENSE',
    '.gitignore',
    'package.json',
    'package-lock.json',
    '_config.yml',
    'sitemap.xml',
    'index.html',
    'core-apis.html',
    'server-side-components.html',
    'client-side-components.html', 
    'modern-development.html',
    'integration.html',
    'specialized-areas.html',
    'count-files.js'
]);

// File extensions to count
const COUNTED_EXTENSIONS = new Set([
    '.js', '.ts', '.json', '.html', '.css', '.py', '.java', '.c', '.cpp', 
    '.cs', '.php', '.rb', '.go', '.rs', '.swift', '.kt', '.md', '.txt', 
    '.xml', '.sql', '.sh', '.bat', '.ps1', '.yml', '.yaml'
]);

function shouldCountFile(fileName, isRoot = false) {
    // Exclude root-level config files
    if (isRoot && EXCLUDED_ROOT_FILES.has(fileName)) {
        return false;
    }
    
    // Check if file has a counted extension
    const ext = path.extname(fileName).toLowerCase();
    return COUNTED_EXTENSIONS.has(ext);
}

function countFilesRecursively(dirPath, isRoot = true) {
    let count = 0;
    let folderCounts = {};
    
    try {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const itemPath = path.join(dirPath, item);
            const stat = fs.statSync(itemPath);
            
            if (stat.isDirectory()) {
                // Skip excluded folders
                if (EXCLUDED_FOLDERS.has(item)) {
                    console.log(`Excluded folder: ${item}`);
                    continue;
                }
                
                // Recursively count files in subdirectory
                const subCount = countFilesRecursively(itemPath, false);
                count += subCount;
                folderCounts[item] = subCount;
                
                if (isRoot) {
                    console.log(`${item}: ${subCount} files`);
                }
            } else if (stat.isFile()) {
                // Count relevant files
                if (shouldCountFile(item, isRoot)) {
                    count++;
                    if (isRoot) {
                        console.log(`Root file counted: ${item}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dirPath}:`, error.message);
    }
    
    return count;
}

// Count files starting from current directory
console.log('Counting files in repository...');
console.log('='.repeat(50));

const totalFiles = countFilesRecursively('.');

// Round to nearest 100 and add + for marketing display
const roundedFiles = Math.floor(totalFiles / 100) * 100;
const displayCount = `${roundedFiles}+`;

console.log('='.repeat(50));
console.log(`Total files counted: ${totalFiles}`);
console.log(`Rounded display count: ${displayCount}`);

// Update the index.html file with the rounded count
const indexPath = './index.html';
if (fs.existsSync(indexPath)) {
    try {
        let indexContent = fs.readFileSync(indexPath, 'utf8');
        
        // Replace the estimated number with the rounded count
        const oldPattern = /totalFiles = \d+;.*\/\/ Actual count from local files/g;
        const newLine = `totalFiles = "${displayCount}"; // Rounded count from ${totalFiles} local files`;
        
        // Also handle the old pattern if it exists
        const oldPattern2 = /totalFiles = \d+;.*\/\/ Realistic estimate/g;
        
        indexContent = indexContent.replace(oldPattern, newLine);
        indexContent = indexContent.replace(oldPattern2, newLine);
        
        // Update the textContent assignment to handle string instead of number
        indexContent = indexContent.replace(
            /snippetsElement\.textContent = totalFiles\.toLocaleString\(\);/g,
            'snippetsElement.textContent = totalFiles;'
        );
        
        fs.writeFileSync(indexPath, indexContent);
        console.log(`Updated index.html with rounded count: ${displayCount} (from actual ${totalFiles})`);
    } catch (error) {
        console.error('Error updating index.html:', error.message);
    }
} else {
    console.log('index.html not found - could not update automatically');
}