import { OAuth2Client } from "google-auth-library";
import { CLIENT_ID } from "../../../../config/config.service.js";

export async function verifyGoogleToken({idToken}){
   
    const clint = new OAuth2Client(CLIENT_ID);
    const ticket = await clint.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
   });
   const payload = ticket.getPayload();

   return payload;
   }