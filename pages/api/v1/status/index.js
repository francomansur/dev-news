import database from "infra/database.js";
import { Client } from "pg";

async function status(requests, response) {
  const updatedAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;

  const result = await database.query({
    text: `SELECT
      current_setting('server_version') AS postgres_version,
      current_setting('max_connections') AS max_connections,
      (SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1) AS used_connections`,
    values: [databaseName],
  });
  //console.log(result);

  const postgresVersion = result.rows[0].postgres_version;
  const maxConnections = result.rows[0].max_connections;
  const usedConnections = result.rows[0].used_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: postgresVersion,
        max_connections: parseInt(maxConnections),
        used_connections: parseInt(usedConnections),
      },
    },
  });
}

export default status;
