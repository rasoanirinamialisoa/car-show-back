import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const postgresConfig = {
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    port: parseInt(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
}

export { postgresConfig }