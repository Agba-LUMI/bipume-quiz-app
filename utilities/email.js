const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const pug = require("pug");
module.exports = class Email {
  constructor(user) {
    this.to = user.activeEmail;
    this.firstName = user.fullName.split(" ")[0];
    this.from = `BRETHREN IN POST UTME <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.BREVO_USERNAME,
          pass: process.env.BREVO_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      });
    }

    // Development transport (e.g., Mailtrap)
    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }
  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../Views/email/${template}.pug`, {
      firstName: this.firstName,
      subject,
    });
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.htmlToText(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(
      "welcomeEmail",
      "You have Successfully Registered for BIPUME MOCK EXAM"
    );
  }
  async resetPassword() {
    await this.send(
      "passwordReset",
      "Your Password reset link (valid for 10mins)"
    );
  }
};
