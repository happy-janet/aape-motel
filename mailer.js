const nodemailer = require('nodemailer');

// Configure the transporter with Gmail and app password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aapemotel35@gmail.com',         // Must be a Gmail account with 2FA enabled
    pass: 'xgepkfqrwczgwako'              // App Password (not your Gmail login password)
  }
});

/**
 * Sends an email using the configured Gmail transporter.
 * 
 * @param {Object} params - Email sending parameters.
 * @param {string} params.from - Sender email address.
 * @param {string} params.to - Recipient email address.
 * @param {string} params.subject - Email subject.
 * @param {string} params.text - Plain text email body.
 */
const sendEmail = async ({ from, to, subject, text }) => {
  const mailOptions = {
    from,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully.');
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    throw error;
  }
};

module.exports = sendEmail;
