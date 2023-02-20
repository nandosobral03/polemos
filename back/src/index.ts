import initialize from "./app"
import { runMigrations } from "./db";
import dotenv from "dotenv";
(
    dotenv.config(),
    async () => {
        await runMigrations();
        await initialize();
    }
)();