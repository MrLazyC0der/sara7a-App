export const templateVerifyEmail = (code, name) => {
    return `
   <!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<style>
  body {
    margin:0;
    padding:0;
    background:#f4f4f4;
    font-family: Arial, Helvetica, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    body {
      background:#0f172a !important;
    }
    .container {
      background:#1e293b !important;
    }
    .text {
      color:#e2e8f0 !important;
    }
    .muted {
      color:#94a3b8 !important;
    }
    .code-box {
      background:#0f172a !important;
      border-color:#334155 !important;
      color:#60a5fa !important;
    }
  }

  @media only screen and (max-width:600px) {
    .wrapper {
      width:100% !important;
    }
    .padding {
      padding:24px !important;
    }
    .code-box {
      font-size:26px !important;
      letter-spacing:6px !important;
    }
  }
</style>
</head>

<body>

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:30px 10px;">

  <!-- CONTAINER -->
  <table class="wrapper container" width="580" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; overflow:hidden;">

    <!-- HEADER -->
    <tr>
      <td style="background:linear-gradient(135deg,#1e3a8a,#2563eb); padding:30px; text-align:center;">
        <div style="font-size:24px; font-weight:700; color:#ffffff;">
          Sara7a App
        </div>
        <div style="font-size:12px; color:rgba(255,255,255,0.7); margin-top:4px;">
          SWE Abdallah
        </div>

        <div style="margin-top:20px; font-size:32px;">📩</div>
      </td>
    </tr>

    <!-- BODY -->
    <tr>
      <td class="padding" style="padding:40px;">

        <h2 class="text" style="margin:0 0 10px; color:#0f172a;">
          Verify your email
        </h2>

        <p class="text" style="font-size:14px; line-height:1.8; color:#334155;">
          Hi ${name},<br>
          Thanks for signing up! Please verify your email to activate your account.
        </p>

        <p class="muted" style="font-size:13px; color:#64748b;">
          This code expires in 10 minutes.
        </p>

        <!-- CODE -->
        <div class="code-box" style="
          background:#f1f5f9;
          border:2px dashed #cbd5f5;
          border-radius:10px;
          text-align:center;
          padding:18px;
          font-size:34px;
          font-weight:bold;
          letter-spacing:8px;
          color:#1e3a8a;
          margin:25px 0;
        ">
          ${code}
        </div>

        

        <!-- WARNING -->
        <div style="
          background:#fff7ed;
          border-left:4px solid #f97316;
          padding:12px;
          border-radius:6px;
          font-size:13px;
          color:#9a3412;
        ">
          If you didn’t create an account, ignore this email.
        </div>

      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="text-align:center; padding:20px; background:#f8fafc;">
        <p class="muted" style="font-size:12px; color:#94a3b8;">
          Sara7a App • Built by SWE Abdallah<br>
          <a href="#" style="color:#2563eb; text-decoration:none;">Unsubscribe</a>
        </p>
      </td>
    </tr>

  </table>

</td>
</tr>
</table>

</body>
</html>



    `
}
export const templateCreateAccount = (name) => {
    return `
    <!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<style>
  body { margin:0; padding:0; background:#f4f4f4; font-family: Arial; }

  @media (prefers-color-scheme: dark) {
    body { background:#0f172a !important; }
    .container { background:#1e293b !important; }
    .text { color:#e2e8f0 !important; }
    .muted { color:#94a3b8 !important; }
  }

  @media (max-width:600px){
    .wrapper { width:100% !important; }
    .padding { padding:24px !important; }
  }
</style>
</head>

<body>

<table width="100%">
<tr>
<td align="center" style="padding:30px 10px;">

<table class="wrapper container" width="580" style="background:#fff; border-radius:14px; overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#16a34a,#22c55e); padding:30px; text-align:center;">
  <div style="font-size:26px; color:#fff;">🎉</div>
  <h2 style="color:#fff; margin:10px 0 0;">Welcome to Sara7a</h2>
</td>
</tr>

<!-- BODY -->
<tr>
<td class="padding" style="padding:40px;">

<h3 class="text" style="margin:0 0 10px; color:#0f172a;">
  Hey ${name},
</h3>

<p class="text" style="color:#334155; line-height:1.8;">
  Your account is ready! You can now start receiving anonymous messages and enjoy the full experience.
</p>

<div style="text-align:center; margin:30px 0;">
  <div style="background:#22c55e; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none;">
    Go to Dashboard
  </div>
</div>

<p class="muted" style="font-size:13px; color:#64748b;">
  We're excited to have you 🚀
</p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="text-align:center; padding:20px; background:#f8fafc;">
  <p class="muted" style="font-size:12px;">
    Sara7a App • SWE Abdallah
  </p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
    `
}
export const templateLogin = ( name ,time) => {
    return `  
    <!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<style>
  body { margin:0; padding:0; background:#f4f4f4; font-family: Arial; }

  @media (prefers-color-scheme: dark) {
    body { background:#0f172a !important; }
    .container { background:#1e293b !important; }
    .text { color:#e2e8f0 !important; }
    .muted { color:#94a3b8 !important; }
    .alert { background:#7f1d1d !important; color:#fecaca !important; }
  }

  @media (max-width:600px){
    .wrapper { width:100% !important; }
    .padding { padding:24px !important; }
  }
</style>
</head>

<body>

<table width="100%">
<tr>
<td align="center" style="padding:30px 10px;">

<table class="wrapper container" width="580" style="background:#fff; border-radius:14px; overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#dc2626,#ef4444); padding:30px; text-align:center;">
  <div style="font-size:26px;">🔐</div>
  <h2 style="color:#fff; margin:10px 0 0;">New Login Detected</h2>
</td>
</tr>

<!-- BODY -->
<tr>
<td class="padding" style="padding:40px;">

<h3 class="text" style="color:#0f172a;">
  Hi ${name},
</h3>

<p class="text" style="color:#334155; line-height:1.8;">
  Your account was just logged in.
</p>

<div style="background:#fef2f2; padding:14px; border-radius:8px; margin:20px 0;">
  <p style="margin:0; font-size:13px;">
    
    🕒 Time: ${time}<br>
    
  </p>
</div>

<div class="alert" style="background:#fff7ed; padding:14px; border-left:4px solid #f97316; border-radius:6px;">
  If this wasn't you, secure your account immediately.
</div>

<div style="text-align:center; margin:25px 0;">
  <div style="background:#ef4444; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none;">
    Secure Account
  </div>
</div>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="text-align:center; padding:20px; background:#f8fafc;">
  <p class="muted" style="font-size:12px;">
    Sara7a App • Security Notification
  </p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>      
    `  
}
export const templateForgetPassword = (name, otp) => {
return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">

<style>
  body {
    margin:0;
    padding:0;
    background:#f4f4f4;
    font-family: Arial, Helvetica, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    body { background:#0f172a !important; }
    .container { background:#1e293b !important; }
    .text { color:#e2e8f0 !important; }
    .muted { color:#94a3b8 !important; }
    .code-box {
      background:#0f172a !important;
      border-color:#334155 !important;
      color:#a78bfa !important;
    }
  }

  @media only screen and (max-width:600px) {
    .wrapper { width:100% !important; }
    .padding { padding:24px !important; }
    .code-box {
      font-size:26px !important;
      letter-spacing:6px !important;
    }
  }
</style>
</head>

<body>

<table width="100%">
<tr>
<td align="center" style="padding:30px 10px;">

<table class="wrapper container" width="580" style="background:#ffffff; border-radius:14px; overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#7c3aed,#a855f7); padding:30px; text-align:center;">
  <div style="font-size:32px;">🔐</div>
  <h2 style="color:#ffffff; margin:10px 0 0;">
    Password Reset Code
  </h2>
</td>
</tr>

<!-- BODY -->
<tr>
<td class="padding" style="padding:40px;">

<h3 class="text" style="margin:0 0 10px; color:#0f172a;">
  Hi ${name},
</h3>

<p class="text" style="font-size:14px; line-height:1.8; color:#334155;">
  We received a request to reset your password. Use the verification code below to continue.
</p>

<!-- OTP BOX -->
<div class="code-box" style="
  background:#f1f5f9;
  border:2px dashed #c4b5fd;
  border-radius:12px;
  text-align:center;
  padding:20px;
  font-size:36px;
  font-weight:bold;
  letter-spacing:10px;
  color:#6d28d9;
  margin:30px 0;
">
  ${otp}
</div>

<p class="muted" style="text-align:center; font-size:13px; color:#64748b;">
  ⏳ This code expires in <strong>10 minutes</strong>
</p>

<!-- WARNING -->
<div style="
  background:#fff7ed;
  border-left:4px solid #f97316;
  padding:14px;
  border-radius:6px;
  font-size:13px;
  color:#9a3412;
  margin-top:20px;
">
  ⚠️ Never share this code with anyone. Our team will never ask for it.
</div>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="text-align:center; padding:20px; background:#f8fafc;">
  <p class="muted" style="font-size:12px; color:#94a3b8;">
    Sara7a App • Security Team<br>
    If you didn’t request this, ignore this email.
  </p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`
}
export const templatePasswordResetSuccess = (name, time) => {
return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">

<style>
  body {
    margin:0;
    padding:0;
    background:#f4f4f4;
    font-family: Arial, Helvetica, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    body { background:#0f172a !important; }
    .container { background:#1e293b !important; }
    .text { color:#e2e8f0 !important; }
    .muted { color:#94a3b8 !important; }
    .success-box {
      background:#052e16 !important;
      color:#bbf7d0 !important;
      border-left-color:#22c55e !important;
    }
  }

  @media only screen and (max-width:600px) {
    .wrapper { width:100% !important; }
    .padding { padding:24px !important; }
  }
</style>
</head>

<body>

<table width="100%">
<tr>
<td align="center" style="padding:30px 10px;">

<table class="wrapper container" width="580" style="background:#ffffff; border-radius:14px; overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#16a34a,#22c55e); padding:30px; text-align:center;">
  <div style="font-size:32px;">✅</div>
  <h2 style="color:#ffffff; margin:10px 0 0;">
    Password Updated Successfully
  </h2>
</td>
</tr>

<!-- BODY -->
<tr>
<td class="padding" style="padding:40px;">

<h3 class="text" style="margin:0 0 10px; color:#0f172a;">
  Hi ${name},
</h3>

<p class="text" style="font-size:14px; line-height:1.8; color:#334155;">
  Your password has been successfully updated.
</p>

<!-- SUCCESS BOX -->
<div class="success-box" style="
  background:#ecfdf5;
  border-left:4px solid #22c55e;
  padding:14px;
  border-radius:6px;
  font-size:13px;
  color:#065f46;
  margin:25px 0;
">
  🔐 Password changed at:<br>
  <strong>${time}</strong>
</div>

<p class="muted" style="font-size:13px; color:#64748b;">
  If you didn’t perform this action, secure your account immediately.
</p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="text-align:center; padding:20px; background:#f8fafc;">
  <p class="muted" style="font-size:12px; color:#94a3b8;">
    Sara7a App • Security Team
  </p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`;
}
export const templateAccountFreezed = (name, freezedAt, freezedBy) => {
return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">

<style>
  body {
    margin:0;
    padding:0;
    background:#f4f4f4;
    font-family: Arial, Helvetica, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    body { background:#0f172a !important; }
    .container { background:#1e293b !important; }
    .text { color:#e2e8f0 !important; }
    .muted { color:#94a3b8 !important; }
    .alert {
      background:#7f1d1d !important;
      color:#fecaca !important;
      border-left-color:#ef4444 !important;
    }
  }

  @media only screen and (max-width:600px) {
    .wrapper { width:100% !important; }
    .padding { padding:24px !important; }
  }
</style>
</head>

<body>

<table width="100%">
<tr>
<td align="center" style="padding:30px 10px;">

<table class="wrapper container" width="580" style="background:#ffffff; border-radius:14px; overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#dc2626,#ef4444); padding:30px; text-align:center;">
  <div style="font-size:32px;">🚫</div>
  <h2 style="color:#ffffff; margin:10px 0 0;">
    Account Frozen
  </h2>
</td>
</tr>

<!-- BODY -->
<tr>
<td class="padding" style="padding:40px;">

<h3 class="text" style="margin:0 0 10px; color:#0f172a;">
  Hi ${name},
</h3>

<p class="text" style="font-size:14px; line-height:1.8; color:#334155;">
  Your account has been temporarily frozen.
</p>

<!-- INFO BOX -->
<div class="alert" style="
  background:#fef2f2;
  border-left:4px solid #ef4444;
  padding:14px;
  border-radius:6px;
  font-size:13px;
  color:#7f1d1d;
  margin:25px 0;
">
  🕒 <strong>Time:</strong> ${freezedAt} <br>
  👤 <strong>Freezed By:</strong> ${freezedBy}
</div>

<p class="muted" style="font-size:13px; color:#64748b;">
  If this action wasn't performed by you, please contact support immediately.
</p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="text-align:center; padding:20px; background:#f8fafc;">
  <p class="muted" style="font-size:12px; color:#94a3b8;">
    Sara7a App • Security Team
  </p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`;
}
export const templateUnfreezeAccountByAdmin = (name, date) => {
return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">

<style>
  body {
    margin:0;
    padding:0;
    background:#f4f4f4;
    font-family: Arial, Helvetica, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    body { background:#0f172a !important; }
    .container { background:#1e293b !important; }
    .text { color:#e2e8f0 !important; }
    .muted { color:#94a3b8 !important; }
    .success-box {
      background:#052e16 !important;
      color:#bbf7d0 !important;
      border-left-color:#22c55e !important;
    }
  }

  @media only screen and (max-width:600px) {
    .wrapper { width:100% !important; }
    .padding { padding:24px !important; }
  }
</style>
</head>

<body>

<table width="100%">
<tr>
<td align="center" style="padding:30px 10px;">

<table class="wrapper container" width="580" style="background:#ffffff; border-radius:14px; overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#16a34a,#22c55e); padding:30px; text-align:center;">
  <div style="font-size:32px;">🔓</div>
  <h2 style="color:#ffffff; margin:10px 0 0;">
    Account Unfrozen
  </h2>
</td>
</tr>

<!-- BODY -->
<tr>
<td class="padding" style="padding:40px;">

<h3 class="text" style="margin:0 0 10px; color:#0f172a;">
  Hi ${name},
</h3>

<p class="text" style="font-size:14px; line-height:1.8; color:#334155;">
  Your account has been successfully restored by the admin. You can now use all features again.
</p>

<!-- INFO BOX -->
<div class="success-box" style="
  background:#ecfdf5;
  border-left:4px solid #22c55e;
  padding:14px;
  border-radius:6px;
  font-size:13px;
  color:#065f46;
  margin:25px 0;
">
  🕒 <strong>Unfrozen At:</strong><br>
  ${date}
</div>

<p class="muted" style="font-size:13px; color:#64748b;">
  If you believe this action was made by mistake, please contact support.
</p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="text-align:center; padding:20px; background:#f8fafc;">
  <p class="muted" style="font-size:12px; color:#94a3b8;">
    Sara7a App • Security Team
  </p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`;
}
//templateUnfreezeAccountByUser
export const templateUnfreezeAccountByUser = (name, date) => {
return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">

<style>
  body {
    margin:0;
    padding:0;
    background:#f4f4f4;
    font-family: Arial, Helvetica, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    body { background:#0f172a !important; }
    .container { background:#1e293b !important; }
    .text { color:#e2e8f0 !important; }
    .muted { color:#94a3b8 !important; }
    .success-box {
      background:#052e16 !important;
      color:#bbf7d0 !important;
      border-left-color:#22c55e !important;
    }
  }

  @media only screen and (max-width:600px) {
    .wrapper { width:100% !important; }
    .padding { padding:24px !important; }
  }
</style>
</head>

<body>

<table width="100%">
<tr>
<td align="center" style="padding:30px 10px;">

<table class="wrapper container" width="580" style="background:#ffffff; border-radius:14px; overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#0ea5e9,#38bdf8); padding:30px; text-align:center;">
  <div style="font-size:32px;">🔓</div>
  <h2 style="color:#ffffff; margin:10px 0 0;">
    Account Restored
  </h2>
</td>
</tr>

<!-- BODY -->
<tr>
<td class="padding" style="padding:40px;">

<h3 class="text" style="margin:0 0 10px; color:#0f172a;">
  Hi ${name},
</h3>

<p class="text" style="font-size:14px; line-height:1.8; color:#334155;">
  Your account has been successfully restored by you. You can now continue using your account normally.
</p>

<!-- INFO BOX -->
<div class="success-box" style="
  background:#ecfeff;
  border-left:4px solid #0ea5e9;
  padding:14px;
  border-radius:6px;
  font-size:13px;
  color:#075985;
  margin:25px 0;
">
  🕒 <strong>Unfrozen At:</strong><br>
  ${date}
</div>

<p class="muted" style="font-size:13px; color:#64748b;">
  If this action wasn’t done by you, please secure your account immediately.
</p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="text-align:center; padding:20px; background:#f8fafc;">
  <p class="muted" style="font-size:12px; color:#94a3b8;">
    Sara7a App • Security Team
  </p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`;
}
export const templateAdminHardDeleteUser = (adminName, userId, deletedAt) => {
return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">

<style>
  body {
    margin:0;
    padding:0;
    background:#f4f4f4;
    font-family: Arial, Helvetica, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    body { background:#0f172a !important; }
    .container { background:#1e293b !important; }
    .text { color:#e2e8f0 !important; }
    .muted { color:#94a3b8 !important; }
    .danger-box {
      background:#7f1d1d !important;
      color:#fecaca !important;
      border-left-color:#ef4444 !important;
    }
  }

  @media only screen and (max-width:600px) {
    .wrapper { width:100% !important; }
    .padding { padding:24px !important; }
  }
</style>
</head>

<body>

<table width="100%">
<tr>
<td align="center" style="padding:30px 10px;">

<table class="wrapper container" width="580" style="background:#ffffff; border-radius:14px; overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#7f1d1d,#dc2626); padding:30px; text-align:center;">
  <div style="font-size:32px;">🗑️</div>
  <h2 style="color:#ffffff; margin:10px 0 0;">
    User Permanently Deleted
  </h2>
</td>
</tr>

<!-- BODY -->
<tr>
<td class="padding" style="padding:40px;">

<h3 class="text" style="margin:0 0 10px; color:#0f172a;">
  Hello ${adminName},
</h3>

<p class="text" style="font-size:14px; line-height:1.8; color:#334155;">
  A user account has been permanently deleted from the system.
</p>

<!-- DETAILS BOX -->
<div class="danger-box" style="
  background:#fef2f2;
  border-left:4px solid #ef4444;
  padding:14px;
  border-radius:6px;
  font-size:13px;
  color:#7f1d1d;
  margin:25px 0;
">
  👤 <strong>User ID:</strong> ${userId}<br>
  🕒 <strong>Deleted At:</strong> ${deletedAt}
</div>

<p class="muted" style="font-size:13px; color:#64748b;">
  ⚠️ This action is irreversible. Please ensure this deletion was intended.
</p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="text-align:center; padding:20px; background:#f8fafc;">
  <p class="muted" style="font-size:12px; color:#94a3b8;">
    Sara7a App • Admin Notification
  </p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`;
}