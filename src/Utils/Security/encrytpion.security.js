import crypto from "node:crypto";
import { ENCRYPTION_SECRET_KEY } from "../../../config/config.service.js";
// symmetric encryption
// secret key 
// IV
const IV_LENGTH = 16;
const SECRET_KEY = ENCRYPTION_SECRET_KEY;  
export const encrypt = async (text) =>{
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, iv);
    const encryptedText = cipher.update(text, "utf-8", "hex") + cipher.final("hex");
    return `${iv.toString("hex")}:${encryptedText}`;
}
export const decrypt = async (encryptedText) =>{
    const [iv, encryptedTextDecrypted] = encryptedText.split(":");
   const binaryLike = Buffer.from(iv, "hex");
   const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, binaryLike);
   const decryptedText = decipher.update(encryptedTextDecrypted, "hex", "utf-8") + decipher.final("utf-8");
   return decryptedText;
}
