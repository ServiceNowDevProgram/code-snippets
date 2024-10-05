const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url, emailToSend, grpName, from) {
    this.to = emailToSend;
    this.firstName = user.name.split(' ')[0];
    this.grpName = grpName;
    this.url = url;
    this.from = from;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secureConnection: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  // Send the email
  async send(htmlContent, subject) {
    //2) Email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: htmlContent,
      text: htmlToText.convert(htmlContent),
    };

    // Create transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendConfirmation() {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Hello, ${this.firstName}!</h2>
        <p>Please Confirm your mail. <strong>${this.grpName}</strong>.</p>
        <p>Click the link below to join:</p>
        <a href="${this.url}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">Confirm</a>
        <p>If the button doesn't work, use this link: <a href="${this.url}">${this.url}</a></p>
      </div>
    `;

    await this.send(htmlContent, 'Mail Confirmation!!');
  }
};
