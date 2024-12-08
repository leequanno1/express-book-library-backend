const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
// Configure your mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ADDRESS??"", 
    pass: process.env.MAIL_APP_PASS??"", 
  },
});

/**
 * 
 * @param {string[]} to : List of recipients
 * @param {string} subject
 * @param {string | null} text
 * @param {string | null} html
 * @returns true if send ok
 */
const sendMail = async (to, subject = "", text = null, html = null) => {
  try {
    // Email options
    const mailOptions = {
      from: process.env.MAIL_ADDRESS??"",
      to: to,
      subject: subject,
      text: text,
      html: html
    };
    // Send the email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {sendMail}