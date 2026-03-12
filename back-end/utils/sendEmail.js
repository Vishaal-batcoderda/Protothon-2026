const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send Email Utility
 * @param {string | string[]} to - recipient email or array of emails
 * @param {string} subject - email subject
 * @param {string} html - html email body
 */

const sendEmail = async (to, subject, html) => {
  try {

    const mailOptions = {
      from: `"Protothon 2026" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully ✅");
    console.log("Message ID:", info.messageId);

  } catch (error) {

    console.error("Email sending failed ❌");
    console.error(error);

    throw error;
  }
};

module.exports = sendEmail;
