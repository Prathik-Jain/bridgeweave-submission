import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";


async function getDb() {
    const client = new Pool({
        host: process.env.DB_HOST ?? "localhost",
        port: parseInt(process.env.DB_PORT ?? "5432"),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    });

    await client.connect();
    return drizzle(client);
}
const db = await getDb()
export default db;