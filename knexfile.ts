import { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
    development: {
        client: process.env.DATABASE_CLIENT as string,
        connection: {
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT || "5432"),
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            ssl: {
                rejectUnauthorized: false
            }
        },
        seeds: {
            directory: "./src/models/seeds"
        },
        pool: {
            min: parseInt(process.env.DATABASE_POOL_MIN || "2"),
            max: parseInt(process.env.DATABASE_POOL_MAX || "10")
        }
    },

    production: {
        client: process.env.DATABASE_CLIENT as string,
        connection: {
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT || "5432"),
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            ssl: {
                rejectUnauthorized: false
            }
        },
        seeds: {
            directory: "./dist/models/seeds"
        },
        pool: {
            min: parseInt(process.env.DATABASE_POOL_MIN || "2"),
            max: parseInt(process.env.DATABASE_POOL_MAX || "10")
        }
    }
};

export default config;
