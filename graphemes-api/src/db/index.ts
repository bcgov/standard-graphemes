import knex from "knex";

import config from "./knexfile.js";

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

if (!dbConfig) {
  throw new Error(
    `No database configuration found for environment: ${environment}`
  );
}

const db = knex(dbConfig);

export default db;
