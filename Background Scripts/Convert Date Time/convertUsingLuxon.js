/*  npm install luxon
     # or
    yarn add luxon
*/


const { DateTime } = require('luxon');

// Define the original date and time in PST
const originalDate = DateTime.fromObject({
  year: 2023,
  month: 10,
  day: 2,
  hour: 16,
  minute: 28,
  second: 40,
  zone: 'America/Los_Angeles', // Pacific Time Zone
});

// Convert to Indian Standard Time (IST)
const convertedDate = originalDate.setZone('Asia/Kolkata');

console.log(convertedDate.toString()); // Output the converted date and time in IST format
