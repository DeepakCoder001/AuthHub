const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready:", success);
  }
});

const sendOtpEmail = async (email, otp, purpose) => {
  const subject =
    purpose === "login"
      ? "Your Login OTP - Phone App"
      : "Your Registration OTP - Phone App";

  const mailOptions = {
    from: `"Phone App" <${process.env.GMAIL_USER}>`,
    to: email,
    subject,
    html: `
      <h2>Your OTP</h2>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes.</p>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };