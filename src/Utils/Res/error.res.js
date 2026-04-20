export const ErrorResponse = ({
    message = "Error",
    statusCode = 500 ,
    extra = null
})=>{
    const error = new Error(
        typeof message === "string" ? message :message?.message || "Error"
    );
    error.statusCode = statusCode;
    error.extra = extra;
    error.isOperational = true;
    throw error;
};


