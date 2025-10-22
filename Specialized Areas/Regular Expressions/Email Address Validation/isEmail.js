//const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//refactor emailRegex
const emailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:(?:\\[\x00-\x7f]|[^\\"\r\n])*)")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}|\[(?:(?:25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(?:25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}|[a-zA-Z0-9-]*[a-zA-Z0-9]:[^\]]+)\])$/;

const emails = [
  // Valid emails
  "example@email.com",
  "user.name+tag@example.co.uk",
  '"quoted.user"@example.com',
  "user@[192.168.1.1]",

  // Invalid emails (should fail)
  "user@-example.com",
  "user@example..com",
  "user@example-.com",
  "user@.example.com"
];

emails.forEach(email => {
  console.log(email, emailRegex.test(email) ? "is valid email addres" : "is invalid email address");
});