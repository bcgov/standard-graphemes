import dotenv from "dotenv";
dotenv.config();
import type { Knex } from "knex";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.warn("DATABASE_URL environment variable is undefined.");
}

const config: { [key: string]: Knex.Config } = {
  // Local development
  development: {
    client: "postgresql",
    connection: {
      connectionString: DATABASE_URL,
      ssl: false,
    },
  },

  // Test and CI
  test: {
    client: "postgresql",
    connection: {
      connectionString: DATABASE_URL,
      ssl: false,
    },
  },

  // OpenShift deployment
  production: {
    client: "postgresql",
    connection: {
      connectionString: DATABASE_URL,
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;
