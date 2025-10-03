/**
 * NodeMailer Email Sending Snippet
 *
 * This snippet demonstrates how to send emails using NodeMailer.
 * It uses environment variables for secure SMTP configuration.
 *
 * Usage:
 * await sendMail("test@example.com", "<h1>Hello from NodeMailer</h1>");
 *
 * @format
 */

const nodemailer = require("nodemailer");

// Async function to send an email
const sendMail = async (emailId, htmlContent) => {
  try {
    // Create reusable transporter object using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com"
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your email address
        pass: process.env.SMTP_PASS, // your email password or app password
      },
    });

    // Define the email options
    const mailOptions = {
      from: `"ServiceNow Integration" <${process.env.SMTP_USER}>`, // sender address
      to: emailId, // list of receivers
      subject: "ServiceNow Notification", // subject line
      text: "This is a plain text body", // plain text body
      html: htmlContent, // html body
    };

    // Send mail with defined options
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
};

module.exports = { sendMail };
