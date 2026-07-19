const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/User');
const Otp = require('../models/Otp');
const { sendOtpEmail } = require('../utils/sendEmail');

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sanitizeUser = (user) => {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  return obj;
};

// =======================
// SEND OTP
// =======================
// =======================
// SEND OTP
// =======================
router.post("/send-otp", async (req, res) => {
  try {
    console.log("========== SEND OTP ==========");

    const { email, purpose = "register" } = req.body;

    console.log("Email:", email);
    console.log("Purpose:", purpose);

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (purpose === "register") {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          message: "User already exists with this email",
        });
      }
    }

    if (purpose === "login") {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "No account found with this email",
        });
      }
    }

   console.log("Checking SMTP Environment...");
console.log("SMTP_HOST:", process.env.SMTP_HOST ? "Loaded" : "Missing");
console.log("SMTP_USER:", process.env.SMTP_USER ? "Loaded" : "Missing");
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Loaded" : "Missing");
console.log("FROM_EMAIL:", process.env.FROM_EMAIL ? "Loaded" : "Missing");

    const otp = generateOtp();

    console.log("Generated OTP:", otp);

    await Otp.deleteMany({ email, purpose });
    console.log("Old OTP Deleted");

    await Otp.create({ email, otp, purpose });
    console.log("New OTP Saved");

    console.log("Sending Email...");

    await sendOtpEmail(email, otp, purpose);

    console.log("Email Sent Successfully");

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
      code: error.code,
      command: error.command,
    });
  }
});

// =======================
// REGISTER (with OTP)
// =======================
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, otp } = req.body;

    if (!name || !email || !phone || !password || !otp) {
      return res.status(400).json({ message: 'All fields including OTP are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const otpRecord = await Otp.findOne({ email, purpose: 'register' }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP expired or not found. Request a new one.' });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      isVerified: true
    });

    await user.save();
    await Otp.deleteMany({ email, purpose: 'register' });

    res.json({
      message: 'Registration successful! You can now login.',
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// =======================
// LOGIN (password)
// =======================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User Not Found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    res.status(200).json({
      message: 'Login Successful',
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// =======================
// LOGIN (OTP via Gmail)
// =======================
router.post('/login-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User Not Found' });
    }

    const otpRecord = await Otp.findOne({ email, purpose: 'login' }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP expired or not found. Request a new one.' });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    await Otp.deleteMany({ email, purpose: 'login' });

    res.status(200).json({
      message: 'Login Successful',
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// =======================
// UPDATE PROFILE
// =======================
router.put('/user/:id', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );

    res.json({
      message: 'Profile Updated Successfully',
      user: sanitizeUser(updatedUser)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// =======================
// GET ALL USERS (optional admin view)
// =======================
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
