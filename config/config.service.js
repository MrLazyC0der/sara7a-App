import { config } from "dotenv";
import { resolve } from "path";
// ===================== LOAD ENV FILE ===================== //
const NODE_ENV = process.env.NODE_ENV;
const path = NODE_ENV === "development" ? resolve("config/.env.development") : resolve("config/.env.production");
config({ path });
// ===================== DATA BASE AND SERVER ===================== //
export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const DB_REDIS_URI = process.env.DB_REDIS_URI;
// ===================== HASH AND ENCRYPTION ===================== //
export const HASH_SALT = parseInt(process.env.SALT) || 10;
export const ENCRYPTION_SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY;
// ===================== USER TOKENS ===================== //
export const ACCESS_USER_SECRET_KEY = process.env.ACCESS_USER_TOKEN_SECRET_KEY;
export const REFRESH_USER_SECRET_KEY = process.env.REFRESH_USER_TOKEN_SECRET_KEY;
// ===================== ADMIN TOKENS ===================== //
export const ACCESS_ADMIN_SECRET_KEY = process.env.ACCESS_ADMIN_TOKEN_SECRET_KEY;
export const REFRESH_ADMIN_SECRET_KEY = process.env.REFRESH_ADMIN_TOKEN_SECRET_KEY;
// ===================== TOKEN EXPIRE TIMES ===================== //
export const ACCESS_EXPIRE = Number(process.env.ACCESS_EXPIRE_TIME);
export const REFRESH_EXPIRE = Number(process.env.REFRESH_EXPIRE_TIME);
// ===================== social login ===================== //
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
// ===================== Email nodeMailer ===================== //
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
// ==========================   Cors =============================//
export const CORS_WHITE_LIST = process.env.WHITE_LIST;