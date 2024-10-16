# Regular Expression for allowing Word Document and PDF files only

## Problem statement

Find or detect word or pdf file before upload

## Regex code explanation

```js
const regex = /([a-zA-Z0-9\s_\\.\-:])+(\.doc|\.docx|\.pdf)$/;
```

> [a-zA-Z0-9\s_\\.\-:]: Any allowable characters to the filename <br/>
> (.doc|.docx|.pdf): This is a capturing group that matches either the file extension .doc, .docs and .pdf.
> $: Matches the end of the string.
## Demo Example

```js
const fileAllowed = ([a-zA-Z0-9\s_\\.\-:])+(\.doc|\.docx|\.pdf)$;

const file = "ABC.doc";

if (fileAllowed.test(file)) {
  console.log("Valid file for upload");
} else {
  console.log("Invalid file upload");
}
```

Above will print: 'Valid file for upload'.
