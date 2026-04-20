import bootstrap from "./app.controller.js";
import { PORT } from "../config/config.service.js";
import chalk from "chalk";
async function startServer() {
    const app = await bootstrap();
    app.listen(PORT, () => {
        console.log(chalk.inverse(`🚀 Server is running at http://localhost:${PORT} 🚀`));
    })
}
startServer();  