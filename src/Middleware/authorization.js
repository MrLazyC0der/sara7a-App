import { ForbiddenError } from "../Utils/Errors/error.helpers.js";

export const authorization = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw ForbiddenError({message:"You are not authorized to perform this action"});
        }
        next();
    };
};