test.only("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  //console.log(JSON.stringify(responseBody, null, 2));

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toEqual(parseUpdatedAt);
  expect(responseBody.dependencies.database.postgres_version).toMatch("16.11");
  expect(responseBody.dependencies.database.max_connections).toBe(100);
  expect(responseBody.dependencies.database.used_connections).toBe(1);
});
