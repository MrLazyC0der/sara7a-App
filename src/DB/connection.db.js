import mongoose from "mongoose";
import { DB_URI } from "../../config/config.service.js";
import chalk from "chalk";

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(chalk.inverse("✅ Database MongoDB connected successfully"));
    } catch (error) {
        console.error(chalk.red("❌ Database MongoDB connection error:"), error);
        process.exit(1);
    }
}; 