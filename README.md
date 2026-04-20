# 🚀 Sara7a API

A production-ready **REST API** built with **Node.js & Express.js**, featuring a robust authentication system, role-based access control, real-time token revocation, and multi-layered file security.

---

## ⚡ Tech Stack

### Core
![Node.js](https://img.shields.io/badge/Node.js-ESModules-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-v5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_v9-47A248?logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-v5-DC382D?logo=redis&logoColor=white)

### Security
![JWT](https://img.shields.io/badge/JWT-Access_+_Refresh-000000?logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-Password_Hashing-FF6B6B)
![argon2](https://img.shields.io/badge/Argon2-Modern_Hashing-9B59B6)
![Helmet](https://img.shields.io/badge/Helmet.js-HTTP_Headers-00C7B7)

### Validation & Upload
![Joi](https://img.shields.io/badge/Joi-Schema_Validation-0080FF)
![Multer](https://img.shields.io/badge/Multer-v2_File_Upload-FF9900)

### Auth & Communication
![Google](https://img.shields.io/badge/Google_OAuth-Social_Login-4285F4?logo=google&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email_Service-22B573)

---

## 🏗️ Architecture

```
src/
├── 🗄️  DB/
│   ├── 📦 Models/              # Mongoose Schemas (User, Message, Google Provider)
│   ├── ⚡ Redis/               # Redis connection + repository
│   └── 📄 database.repository.js  # Generic CRUD layer (findById, updateOne...)
│
├── 📡 Modules/
│   ├── 🔐 Auth/                # signup, signin, logout, refresh, OAuth, OTP
│   ├── 👤 User/                # profile, password, freeze/unfreeze, hard-delete
│   └── 💬 Message/             # send, get, admin view, user inbox
│
├── 🛡️  Middleware/
│   ├── 🔑 auth.middleware.js        # decodeToken + authentication()
│   ├── 🚦 authorization.js          # Role-based access control
│   ├── 🔍 magicNumber.middleware.js # File byte-level verification
│   ├── ✅ validation.middleware.js  # Joi schema validation
│   └── 💥 Handler/globalError.handler.js
│
└── 🧰 Utils/
    ├── 🔒 Security/            # JWT signing/verify, bcrypt, AES encryption
    ├── 📧 Email/               # Nodemailer transporter + HTML template generator
    ├── 📣 Events/              # Node.js EventEmitter (async email events)
    ├── ❌ Errors/              # Custom error helpers (BadRequest, NotFound...)
    ├── 📬 Res/                 # Standardized success/error response shapes
    ├── 🏷️  Enums/              # Role, Token, Gender, Provider, Logout enums
    ├── 📐 Validation/          # Joi general fields (email, password, id, OTP...)
    ├── 🌐 Cors/                # CORS origin configuration
    └── 📝 Logging/             # Morgan HTTP request logger
```

---

## 🔐 Authentication System

### Dual-Token Strategy
- **Access Token** — short-lived (1hr), signed per role (`user` / `admin`)
- **Refresh Token** — used exclusively to rotate access tokens

### Logout Modes
| Mode | Mechanism | Scope |
|------|-----------|-------|
| **Soft Logout** | Stores `jti` in Redis with TTL = remaining token lifetime | Current device only |
| **Hard Logout** | Sets `changeCredentialsAt` timestamp in DB | All devices instantly |

### Token Validation Pipeline
```
Request → Decode Bearer → Verify Signature → Check Redis (revoked?) → Load User → Check changeCredentialsAt
```

---

## 🛡️ Security Features

- **Magic Number Validation** — reads first 4 bytes of uploaded files to verify true file type (prevents disguised executables)
- **AES Encryption** — sensitive fields (phone) encrypted at rest
- **bcrypt + Argon2** — flexible password hashing
- **Helmet.js** — secure HTTP headers
- **express-rate-limit** — brute-force protection
- **CORS** — configurable origin whitelisting
- **Joi** — strict schema validation on all inputs

---

## 📡 API Overview

### Auth `/api/auth`
```
POST   /signup              Register + send OTP email
POST   /signin              Login → Access + Refresh tokens
POST   /refresh-token       Rotate access token
POST   /social-login        Google OAuth login
POST   /confirm-email       Verify OTP
POST   /forget-password     Send reset OTP
POST   /reset-password      Reset with OTP
POST   /logout              Soft or Hard logout
```

### User `/api/user`
```
GET    /                         [Admin] Get user by ID
PATCH  /profile-image            [User]  Upload avatar (Magic Number + Joi validated)
PATCH  /update-password          [User|Admin] Change password
DELETE /{:userId}/freeze-account [User|Admin] Freeze account
PATCH  /:userId/unfreeze-account-by-admin  [Admin] Unfreeze
PATCH  /unfreeze-account-by-user           [User]  Self-unfreeze
DELETE /:userId/hard-delete      [Admin] Permanently delete user
```

### Message `/api/message`
```
POST   /:receiverId/message       Send message (public)
GET    /:messageId/message        Get message by ID (public)
GET    /all-messages/:receiverId? [Admin] All messages with optional filter
GET    /user-messages             [User]  My messages
```

---

## 📧 Event-Driven Email System

Uses Node.js native **EventEmitter** to decouple email sending from business logic:

```javascript
// Business logic just fires an event
emailEmitter.emit("sendEmail", { to, subject, html });

// Listener handles it asynchronously
emailEmitter.on("sendEmail", async ({ to, subject, html }) => {
    await transporter.sendMail({ to, subject, html });
});
```

---

## 🧰 Dev Tooling

| Tool | Purpose |
|------|---------|
| **nodemon** | Auto-restart in development |
| **cross-env** | Cross-platform env variables |
| **ESLint** | Code quality |
| **Morgan** | HTTP request logging |
| **chalk** | Colored console output |
| **dotenv** | Environment config |
| **uuid v14** | Unique `jti` per token |

---

## 🚦 Request Lifecycle (Profile Image Upload)

```
POST /api/user/profile-image
        │
        ├─ authentication()        Verify JWT + Redis + DB checks
        ├─ authorization(User)     Role guard
        ├─ multer.single()         Save to disk → public/uploads/users/:id/
        ├─ validateMagicNumber()   Read 4 bytes → verify real image type
        ├─ validationMiddleware()  Joi → mimetype + max 5MB
        └─ uploadProfileImage()   Update profileImage path in DB
```

---

## 🌍 Environment

```env
NODE_ENV=development | production
PORT=
MONGO_URI=
REDIS_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
ADMIN_ACCESS_TOKEN_SECRET=
ADMIN_REFRESH_TOKEN_SECRET=
ACCESS_EXPIRE_TIME=3600
REFRESH_EXPIRE_TIME=
GOOGLE_CLIENT_ID=
SMTP_EMAIL=
SMTP_PASSWORD=
```

---

> Built by **Abdallah** — SWE @ Sara7a
