const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpEmail = async (email, otp, purpose) => {
  const subject =
    purpose === "login"
      ? "Your Login OTP - Phone App"
      : "Your Registration OTP - Phone App";

  try {
    const response = await resend.emails.send({
      from: "Phone App <onboarding@resend.dev>",
      to: email,
      subject,
      html: `
        <h2>Your OTP</h2>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    });

    if (response.error) {
      console.error("RESEND ERROR:", response.error);
      throw new Error(response.error.message || "Failed to send email");
    }

    console.log("Email sent successfully:", response.data?.id);
    return response;
  } catch (error) {
    console.error("SEND EMAIL ERROR:", error);
    throw error;
  }
};

module.exports = { sendOtpEmail };