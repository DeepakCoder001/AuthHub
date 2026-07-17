const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4, // Force IPv4
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

transporter.verify((error) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to send emails");
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

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };
// hello