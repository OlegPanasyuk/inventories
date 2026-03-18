import "server-only";
import { Sequelize } from "sequelize";

const DEFAULT_DB_PORT = 5432;

declare global {
  // Reuse the same Sequelize instance during hot reload in development.
  var __sequelize__: Sequelize | undefined;
}

function getDatabaseConfig() {
  return {
    database: process.env.DB_NAME ?? "postgres",
    username: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? process.env.SOFTWARE_PASSWORD ?? "root",
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? DEFAULT_DB_PORT),
  };
}

function createSequelizeInstance() {
  const config = getDatabaseConfig();

  return new Sequelize(config.database, config.username, config.password, {
    dialect: "postgres",
    host: config.host,
    port: config.port,
    logging: false,
  });
}

export const sequelize =
  globalThis.__sequelize__ ?? createSequelizeInstance();

if (process.env.NODE_ENV !== "production") {
  globalThis.__sequelize__ = sequelize;
}

export async function verifyDatabaseConnection() {
  await sequelize.authenticate();
  return {
    database: sequelize.getDatabaseName(),
    host: sequelize.options.host,
    port: sequelize.options.port,
  };
}
