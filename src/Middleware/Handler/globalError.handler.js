export const globalErrorHandler = (err, req, res, next) => {
    
    // operational 
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            status: err.statusCode,
            extra: err.extra || null
        });
    }

    // unexpected 
    console.error(err); 
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        status: 500,
        extra: null
    });
};