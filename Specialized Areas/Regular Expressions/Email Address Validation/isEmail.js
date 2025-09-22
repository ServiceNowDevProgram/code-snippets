const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const email = "example@email.com";

if (emailRegex.test(email)) {
  console.log("Valid email address");
} else {
  console.log("Invalid email address");
}
