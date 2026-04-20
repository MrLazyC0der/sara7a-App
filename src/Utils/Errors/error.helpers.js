import { ErrorResponse } from "../Res/error.res.js";

export const BadRequestError = ({message = "Bad Request", extra = null})=>{
    return ErrorResponse({message,statusCode:400,extra});
};
export const UnAuthorizedError = ({message = "UnAuthorized", extra = null})=>{
    return ErrorResponse({message,statusCode:401,extra});
};
export const NotFoundError = ({message = "Not Found", extra = null})=>{
    return ErrorResponse({message,statusCode:404,extra});
};
export const ServerError = ({message = "Internal Server Error", extra = null})=>{
    return ErrorResponse({message,statusCode:500,extra});
}; 
export const ConflictError = ({message = "Conflict", extra = null})=>{
    return ErrorResponse({message,statusCode:409,extra});
};
export const ForbiddenError = ({message = "Forbidden", extra = null})=>{
    return ErrorResponse({message,statusCode:403,extra});
};
