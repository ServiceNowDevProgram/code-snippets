# 📧 NodeMailer Email Integration

This snippet demonstrates how to send emails using **NodeMailer** in a Node.js environment.  
It is useful for integrating ServiceNow or custom applications with external email providers via SMTP.  

## ✨ Features
- Uses environment variables for secure configuration.  
- Sends both **plain text** and **HTML** emails.  
- Provides error handling and logging.  
- Ready for integration in ServiceNow-related workflows or external utilities.  

## 🛠️ Setup Instructions
1. Install dependencies:
   ```bash
   npm install nodemailer


2. 🔧 Configure Environment Variables

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

3. 📧 Sending Emails with NodeMailer

You can use the provided snippet to quickly send emails:

```javascript
// Import the sendMail function
const { sendMail } = require("./sendMail");

// Send an email
sendMail("receiver@example.com", "<h1>Hello from NodeMailer</h1>");
