/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((acc, line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        return acc;
      }

      const separatorIndex = trimmed.indexOf("=");

      if (separatorIndex === -1) {
        return acc;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();

      acc[key] = value;
      return acc;
    }, {});
}

const envFromFile = parseEnvFile(path.resolve(process.cwd(), ".env"));

function readEnv(name, fallback) {
  return process.env[name] ?? envFromFile[name] ?? fallback;
}

function buildConfig(database) {
  return {
    username: readEnv("DB_USER", "postgres"),
    password: readEnv("DB_PASSWORD", readEnv("SOFTWARE_PASSWORD", "root")),
    database,
    host: readEnv("DB_HOST", "127.0.0.1"),
    port: Number(readEnv("DB_PORT", "5432")),
    dialect: "postgres",
    logging: true,
  };
}

module.exports = {
  development: buildConfig(readEnv("DB_NAME", "postgres")),
  test: buildConfig(readEnv("DB_TEST_NAME", "inventories_test")),
  production: buildConfig(readEnv("DB_NAME", "postgres")),
};