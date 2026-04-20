import fs from "node:fs";
import path from "node:path";
import morgan from "morgan";
const _direname = path.resolve();

export function attachRouterWithLogger(app, routerPath, router, logFileName) {
    const logStream = fs.createWriteStream(
        path.join(_direname, "./src/logger", logFileName),
        { flags: "a" } // a => append to the file , w write and overwrite the file
    );
    app.use(routerPath, morgan("combined", { stream: logStream }));
    app.use(routerPath, morgan("dev"), router);

}