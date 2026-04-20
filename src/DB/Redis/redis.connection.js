import { createClient } from "redis";
import { DB_REDIS_URI } from "../../../config/config.service.js";
import chalk from "chalk";

export const redisClient = createClient({
    url: DB_REDIS_URI
});
export const connectRedis = async ()=>{
    try{
        await redisClient.connect();
        console.log(chalk.inverse("✅ Database Redis connected successfully"));
    }catch(error){
        console.error(chalk.red("❌ Database Redis connection error "), error);
        process.exit(1);
    }
}

