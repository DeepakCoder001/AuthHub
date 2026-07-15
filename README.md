# 📱 Auth HUB - OTP Authentication App

Auth HUB is a Full Stack OTP Authentication application built using React, Node.js, Express, and MongoDB. The application allows users to register and log in securely using Gmail OTP verification. After successful authentication, users can view their profile, edit their information, and securely log out.

---

## ✨ Features

- 👤 User Registration
- 📧 Gmail OTP Verification
- 🔐 Secure User Login
- 👨‍💼 Display Logged-in User Name
- ✏️ Edit User Profile
- 🚪 Secure Logout
- 🔒 Password Encryption
- 🔑 JWT Authentication
- 📱 Responsive User Interface
- ⚡ Fast and User-Friendly Experience

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- Gmail OTP Verification
- Nodemailer
- JWT Authentication

### Tools
- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```
PHONEAPP/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── gmailotp/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── eslint.config.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/DeepakCoder001/AuthHub.git
```

### Go to the Project Folder

```bash
cd auth-hub
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../gmailotp
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGODB_URI=Your_MongoDB_Connection_String

EMAIL=Your_Gmail_Address

EMAIL_PASSWORD=Your_Gmail_App_Password

JWT_SECRET=Your_JWT_SECRET
```

---

## ▶️ Run the Project

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd gmailotp
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

The backend will run on:

```
http://localhost:5000
```

---

## 🔄 Application Workflow

1. User registers with their Name, Email, and Password.
2. A verification OTP is sent to the user's Gmail address.
3. The user enters the OTP to verify the account.
4. After successful verification, the user can log in securely.
5. The logged-in user's name is displayed on the profile page.
6. Users can edit their profile information.
7. Users can securely log out of the application.

---

## 🔒 Security Features

- Gmail OTP Verification
- JWT Authentication
- Password Encryption
- Protected Routes
- Secure Logout

---

## 🚀 Future Improvements

- Forgot Password using OTP
- Change Password
- Profile Picture Upload
- Dark Mode
- Delete Account
- Mobile OTP Authentication

---



## 🌐 Live Demo

Add your deployed project link here.

Example:

Frontend:
https://authhub-frontend.onrender.com

Backend API:
(https://authhub-backend-wyyr.onrender.com)

## 💻 GitHub Repository

```
https://github.com/DeepakCoder001/AuthHub
```

---

## 👨‍💻 Author

**DEEPAK**

Full Stack Developer

GitHub:
https://github.com/DeepakCoder001

LinkedIn:
www.linkedin.com/in/deepak-kumar-350b43321

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork this repository and submit a pull request.

---

## ⭐ Support

If you like this project, don't forget to give it a ⭐ on GitHub.

---

