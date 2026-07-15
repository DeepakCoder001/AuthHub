const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const sendOtpEmail = async (email, otp, purpose) => {
  const subject =
    purpose === 'login'
      ? 'Your Login OTP - Phone App'
      : 'Your Registration OTP - Phone App';

  const mailOptions = {
    from: `"Phone App" <${process.env.GMAIL_USER}>`,
    to: email,
    subject,
    html: `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 2px solid #333;">
        <h2 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 10px;">Verification Code</h2>
        <p style="color: #555; font-size: 16px;">Your one-time password is:</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #000; text-align: center; padding: 16px; background: #f5f5dc; border: 1px solid #999;">${otp}</p>
        <p style="color: #777; font-size: 14px;">This code expires in 10 minutes. Do not share it with anyone.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };
