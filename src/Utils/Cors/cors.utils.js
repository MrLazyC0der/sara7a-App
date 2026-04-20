import { CORS_WHITE_LIST } from "../../../config/config.service.js";
import { BadRequestError } from "../Errors/error.helpers.js";

export function corsOptions() {
    const whiteList = CORS_WHITE_LIST.split(",");

    const corsOptions = {
        origin: function (origin, callback) {
            if (whiteList.includes(origin)) {
                console.log("✅ Allowed");
                callback(null, true);
            } else if (!origin) {
                console.log("✅ Allowed (No origin)");
                callback(null, true);
            } else {
                console.log("❌ Blocked");
                callback(BadRequestError({message:"Not allowed by CORS"}));
            }
        }
    };

    return corsOptions;
}