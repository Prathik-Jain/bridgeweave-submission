import dotenv from 'dotenv'
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from 'postgres';

async function runMigrations() {
    dotenv.config({ path: '.env.local' })
    const client = postgres(`postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.POSTGRES_DB}`, { max: 1 });
    const db = drizzle(client);
    await migrate(db, { migrationsFolder: './drizzle' });
    await client.end();
}

runMigrations();
