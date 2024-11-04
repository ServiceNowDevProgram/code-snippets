// ISBN Validator
// This regex validates both ISBN-10 and ISBN-13 formats

const isbnRegex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;

function validateISBN(isbn) {
  return isbnRegex.test(isbn);
}

// Example usage:
console.log(validateISBN('ISBN 978-0-596-52068-7')); // true
console.log(validateISBN('0-596-52068-9')); // true
console.log(validateISBN('0 512 52068 9')); // false