const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

// Check SMTP connection
transporter.verify((error, success) => {
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
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color:#333;">Phone App Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing:6px; color:#007bff;">${otp}</h1>
        <p>This OTP is valid for <b>10 minutes</b>.</p>
        <p>Please do not share this OTP with anyone.</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };