import path from "path";
import { DatabaseSync } from "node:sqlite";

const dbPath = path.resolve(process.cwd(), "database/longlist-advance.db");

console.log("Database location:", dbPath);

export const db = new DatabaseSync(dbPath);


