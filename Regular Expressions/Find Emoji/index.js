const withEmojis = /\p{Extended_Pictographic}/ug

const familyEmoji = '👨‍👩‍👧' 
console.log(withEmojis.test(familyEmoji))
//true

const familyString = 'family'
console.log(withEmojis.test(familyString))
//false