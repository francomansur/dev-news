import { Client } from "pg";

function getSSLValues() {
  if (process.env.PGSSLMODE === "require") {
    return {
      rejectUnauthorized: true,
    };
  }
  return false;
}

async function query(queryObject) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
