// import all dependencies
import express from "express";
import { connectDB } from "./DB/connection.db.js";
import { globalErrorHandler } from "./Middleware/Handler/globalError.handler.js";
// import { userRouter } from "./Modules/index.js";
import { NotFoundError } from "./Utils/Errors/error.helpers.js";
import { successResponse } from "./Utils/Res/success.res.js";
import { userController, authController, messageController } from "./Modules/index.js";
import { senEmail } from "./Utils/Email/email.utils.js";
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { corsOptions } from "./Utils/Cors/cors.utils.js";
import { attachRouterWithLogger } from "./Utils/Logging/morgan.logger.js";
import { connectRedis } from "./DB/Redis/redis.connection.js";
export default async function bootstrap() {
    // 1. connect to DB  
    await connectDB();
    await connectRedis();

    // 2. create app 
    const app = express();

    // 3. middleware 
    app.use(express.json());
    app.use(cors(corsOptions()));
    app.use(helmet());
    app.use(morgan("combined"))
    attachRouterWithLogger(app, "/api/auth", authController, "auth.log");
    attachRouterWithLogger(app, "/api/user", userController, "user.log");
    attachRouterWithLogger(app, "/api/message", messageController, "message.log");

    app.use("/public", express.static("public"));
    // 4. routes 
    app.use('/api/auth', authController);
    app.use('/api/user', userController);
    app.use('/api/message', messageController)
    app.get("/", (req, res) => {
        return successResponse({ res, message: "Welcome to Sara7a API , Please check your URL" })
    })
    // 5. notFound Handler (catch all routes)
    app.all("/*dummy", (req, res) => {
        throw NotFoundError({
            message: "Not Found API Route , Please check your URL"
        })
    })

    // 6. global error handler
    app.use(globalErrorHandler);

    // 7. return app to main.js to start server
    return app;
}

// logs 
// 1. request logger middleware
// 2. error logger middleware
// 3. security logger middleware
// 4. performance logger middleware
// 5. access logger middleware
// 6. audit logger middleware
// 7. debug logger middleware
// 8. info logger middleware
// 9. warn logger middleware
// 10. error logger middleware