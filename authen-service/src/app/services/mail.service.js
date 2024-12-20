const nodemailer = require("nodemailer");
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

const generateMailHtml = (content) => {
  return `
    <html>
      <head>
        <style>
          .container {
            padding: 10px;
            margin: 10px;
            border: 1px solid black;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${content}
        </div>
      </body>
    </html>
  `;
};

const generateSixDigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

const generateActiveCodeMailContent = (activeCode) => {
  return `
    <h1>Active code</h1>
    <p>Your active code is: ${activeCode}</p>
  `;
}

const handleSendActiceCodeMail = async (to) => {
  const activeCode = generateSixDigitCode();
  const content = generateActiveCodeMailContent(activeCode);
  const html = generateMailHtml(content);
  const subject = "Active code";
  const isSend = await sendMail(to, subject, null, html);
  return isSend ? activeCode : null;
}

module.exports = {sendMail, handleSendActiceCodeMail}