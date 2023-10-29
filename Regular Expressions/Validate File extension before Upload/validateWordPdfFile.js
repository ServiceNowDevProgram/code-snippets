const fileAllowed = ([a-zA-Z0-9\s_\\.\-:])+(.doc|.docx|.pdf)$;

const file = "ABC.doc";

if (fileAllowed.test(file)) {
  console.log("Valid file for upload");
} else {
  console.log("Invalid file upload");
}
