import { EventEmitter } from "events";
import {
    templateAccountFreezed, 
    templateAdminHardDeleteUser, 
    templateCreateAccount, 
    templateForgetPassword, 
    templateLogin, 
    templatePasswordResetSuccess, 
    templateUnfreezeAccountByAdmin, 
    templateUnfreezeAccountByUser, 
    templateVerifyEmail } from "../Email/generateHTML.js";
import { senEmail } from "../Email/email.utils.js";
import { emailSubject } from "../Email/email.utils.js";
export const emailEvent = new EventEmitter();
emailEvent.on("confirmEmailMail", async (data) => {
    await senEmail({
        to: data.to,
        subject: emailSubject.verifyEmail,  
        html:templateVerifyEmail(data.otp , data.firstName),
    });
});
emailEvent.on("createAccountMail", async (data) => {
    await senEmail({
        to: data.to,
        subject: emailSubject.welcome,  
        html:templateCreateAccount(data.firstName),
    });
});
emailEvent.on("loginMail", async (data) => {
    await senEmail({
        to: data.to,
        subject: emailSubject.login,  
        html:templateLogin(data.firstName , data.time),
    });
});
emailEvent.on("forgetPasswordMail", async (data) => {
    await senEmail({
        to: data.to,
        subject: emailSubject.resetPassword,  
        html:templateForgetPassword(data.firstName , data.otp),
    });
});
emailEvent.on("passwordResetSuccessMail", async (data) => {
    await senEmail({
        to: data.to,
        subject: emailSubject.resetPasswordSuccess,  
        html:templatePasswordResetSuccess(data.firstName , data.time),
    });
});
emailEvent.on("accountFreezedMail", async (data) => {
    await senEmail({
        to: data.to,
        subject: emailSubject.accountFreezed,  
        html:templateAccountFreezed(data.firstName , data.time , data.freezedBy),
    });
})
emailEvent.on("unfreezeAccountByAdminMail", async (data) => {
    await senEmail({
        to: data.to,
        subject: emailSubject.unfreezeAccountByAdmin,  
        html:templateUnfreezeAccountByAdmin(data.firstName , data.time),
    });
})
emailEvent.on("unfreezeAccountByUserMail", async (data) => {
    await senEmail({
        to: data.to,
        subject: emailSubject.unfreezeAccountByUser,  
        html:templateUnfreezeAccountByUser(data.firstName , data.time),
    });
})
emailEvent.on("adminHardDeleteUserMail", async (data) => {
    await senEmail({
        to: data.to,
        subject: emailSubject.adminHardDeleteUser,  
        html:templateAdminHardDeleteUser(data.adminName , data.userId , data.deletedAt),
    }); 
})


