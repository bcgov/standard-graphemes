import dotenv from "dotenv";
dotenv.config();
import type { Knex } from "knex";

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PASS = process.env.DB_PASS;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;

if (!DB_HOST) {
  console.warn("Missing database configuration DB_HOST");
}
if (!DB_NAME) {
  console.warn("Missing database configuration DB_NAME");
}
if (!DB_PASS) {
  console.warn("Missing database configuration DB_PASS");
}
if (!DB_PORT) {
  console.warn("Missing database configuration DB_PORT");
}
if (!DB_USER) {
  console.warn("Missing database configuration DB_USER");
}

const connectionString = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const config: { [key: string]: Knex.Config } = {
  // Local development
  development: {
    client: "postgresql",
    connection: {
      connectionString,
      ssl: false,
    },
  },

  // Test and CI
  test: {
    client: "postgresql",
    connection: {
      connectionString,
      ssl: false,
    },
  },

  // OpenShift deployment
  production: {
    client: "postgresql",
    connection: {
      connectionString,
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;
