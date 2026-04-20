import {hash,compare} from "bcrypt";
import * as argon2 from "argon2";
import { HASH_SALT } from "../../../config/config.service.js";

export const genereteHash = async ({plainText,salt = HASH_SALT, algorithm = "bcrypt"}) => {
    let hashText = "";
    switch (algorithm) {
        case "argon2":
            hashText = await argon2.hash(plainText);
            break;
        case "bcrypt":
            hashText = await hash(plainText, salt);
            break;
        default:
            hashText = await argon2.hash(plainText);
    }
    return hashText;
}
export const compareHash = async ({plainText,hashText,algorithm = "bcrypt"}) => {
    let isMatch = false;
    switch (algorithm) {
        case "argon2":
            isMatch = await argon2.verify(hashText, plainText);
            break;
        case "bcrypt":
            isMatch = await compare(plainText, hashText);
            break;
        default:
            isMatch = await argon2.verify(hashText, plainText);
    }
    return isMatch;
}   