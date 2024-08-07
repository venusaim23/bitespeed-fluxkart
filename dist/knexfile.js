"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        client: process.env.DATABASE_CLIENT,
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
        client: process.env.DATABASE_CLIENT,
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
exports.default = config;
