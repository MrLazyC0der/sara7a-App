import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "../../../config/config.service.js";
import { ServerError } from "../Errors/error.helpers.js";
export async function senEmail({ to , subject = "", html = "", text = "", attachments = [], cc = "", bcc = "" }) {
    // Create a transporter using SMTP   
    const transporter = nodemailer.createTransport({
        service: "gmail", // outlook , icloud 
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,// app password not real password 
        },
    });
    try {
        const info = await transporter.sendMail({
            from: `SWE Abdallah <${EMAIL_USER}>`, //   sender address
            to, // list of recipients
            subject, // subject line
            text, // plain text body
            html, // HTML body
            attachments,
            cc,
            bcc
        });


        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
        throw ServerError({ message: `Error while sending mail ${err.message}`, statusCode: 500, });
    }
}

export const emailSubject = {
    verifyEmail: "Verify Your Email |Sara7a App | SWE Abdallah ",
    resetPassword: "Reset Your Password | Sara7a App | SWE Abdallah",
    welcome: "Welcome to Our Platform | Sara7a App | SWE Abdallah",
    contactUs: "Contact Us | Sara7a App | SWE Abdallah",
    login: "Login | Sara7a App | SWE Abdallah",
    accountFreezed: "Account Frozen | Sara7a App | SWE Abdallah",
    unfreezeAccountByAdmin: "Account Unfrozen By Admin | Sara7a App | SWE Abdallah",
    unfreezeAccountByUser: "Account Unfrozen By You | Sara7a App | SWE Abdallah",
    adminHardDeleteUser: "User Permanently Deleted | Sara7a App | SWE Abdallah",
    }
    //resetPasswordSuccess
