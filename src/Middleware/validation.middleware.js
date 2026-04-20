import { BadRequestError } from "../Utils/Errors/error.helpers.js";

export const validationMiddleware = (schema) => {
    // closure
    return (req, res, next) => {
        // logic of middleware 
        const validationError = []
        for(const key of Object.keys(schema)){
            //log keys and values
            const validationResult = schema[key].validate(req[key] , {abortEarly: false});
            if(validationResult.error){
                validationError.push(...validationResult.error.details.map(err => err.message));
            }
        }
        if(validationError.length > 0){
            throw BadRequestError({ message: "Invalid Validation", extra: validationError });
        }
        next();
    }
}
