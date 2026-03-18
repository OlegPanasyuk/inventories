import "server-only";
import { Sequelize } from "sequelize";
import databaseConfigs from "../../../config/database.cjs";
import { initUserModel } from "@/lib/models/User";

type DatabaseEnvironment = "development" | "test" | "production";
type DatabaseConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: "postgres";
  logging: boolean;
};

type DatabaseConfigMap = Record<DatabaseEnvironment, DatabaseConfig>;

const resolvedEnvironment: DatabaseEnvironment =
  process.env.NODE_ENV === "production"
    ? "production"
    : process.env.NODE_ENV === "test"
      ? "test"
      : "development";

const dbConfigs = databaseConfigs as DatabaseConfigMap;

declare global {
  var __sequelize__: Sequelize | undefined;
}

function getDatabaseConfig() {
  return dbConfigs[resolvedEnvironment];
}

function createSequelizeInstance() {
  const config = getDatabaseConfig();

  return new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    host: config.host,
    port: config.port,
    logging: config.logging,
  });
}

export const sequelize =
  globalThis.__sequelize__ ?? createSequelizeInstance();

if (process.env.NODE_ENV !== "production") {
  globalThis.__sequelize__ = sequelize;
}

if (!sequelize.models.User) {
  initUserModel(sequelize);
}

export async function verifyDatabaseConnection() {
  const config = getDatabaseConfig();

  await sequelize.authenticate();
  return {
    database: config.database,
    host: config.host,
    port: config.port,
  };
}