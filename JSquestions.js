//How to remove duplicates from an array using spread and set Object.

//Here is how this works like.

const numbers = [2,4,5,2,3,5,2,4,9,6,9,10,3,10];
const uniqueNumbers = [...new Set(numbers)];
console.log(uniqueNumbers); //[2, 4, 5, 3, 9, 6, 10]
