# How to contribute

To contribute, just follow these steps:

1. Fork this repo
2. Add, edit, or re-organize Code Snippets by editing folders and files and commiting them to your forked repository
3. Submit a pull request to the main branch of `ServiceNowDevProgram / code-snippets`
  - Pull requests should have a title/comment that describes what is being added/changed
  - Pull requests shuold only contain files that are relevant to what is said in the pull request's title

That's it! A developer advocate or an sndevs designated approver will review your pull request and if approved, merge it into this repo for everyone's benefit!

**Note on multiple submissions**: If you plan on doing another pull request and your original pull request hasn't been approved+merged yet, make sure to create a new branch in your forked repo first.

## Follow this structure

- **Top level folders** (besides the .github folder) are `CATEGORIES` of snippets.
- Within each top level folder/category, will be a **sub-folder** for `EACH CODE SNIPPET`
- Within each sub-folder/code snippet folder, will be one readme.md file to describe the code snippet and then all variants of that code snippet as their own file.

### Example Structure

- `.github` folder
- `fruits` folder
  - `apples` folder
    - `readme.md` file describing the apples code snippet
    - `apples.js` first file with code snippet
    - `fijiapples.js` a second file that has a slight variation that distinguishes a separate use-case
  - `kiwi` folder
    - `readme.md` file describing the kiwi code snippet
    - `kiwi.js` file with code snippet
- `vegetables` folder
  - `carrots` folder
    - `readme.md` file describing the vegetables code snippet
    - `carrots.js` first file with code snippet
  - `potatos` folder
    - `readme.md` file describing the potatos code snippet
    - `potatos.js` file with original code snippet
    - `yukongoldpotato.js` file that is similar to potato.js but is for yukon gold potatos specifically
    - `tatertots.js` file that is similar to potato.js but is for when you need the result to be tater tots

## REMEMBER

Before you submit your pull request, all code snippet files should:

- Be in a matching folder
- That folder should be in a category folder
- Your code snippet should be accompanied by a readme.md file to describe it
