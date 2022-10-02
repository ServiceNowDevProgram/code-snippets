const withEmojis = /\p{Extended_Pictographic}/ug

const familyEmoji = '👨‍👩‍👧'  
console.log(withEmojis.test(familyEmoji))

const familyString = 'family'
console.log(withEmojis.test(familyString))


const familyEmoji = '👪'  
console.log(withEmojis.test(familyEmoji))

const familyString = 'family'
console.log(withEmojis.test(familyString))
