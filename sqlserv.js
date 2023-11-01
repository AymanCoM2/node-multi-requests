const sql = require("mssql");

const config = {
  user: "ayman",
  password: "admin@1234",
  server: "10.10.10.100",
  database: "AljouaiT",
  encrypt: false,
  trustServerCertificate: true,
  requestTimeout: 50000,
  connectionTimeout: 35000,
};

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    const pool = new sql.ConnectionPool(config);

    pool
      .connect()
      .then((pool) => {
        return pool.request().query(query);
      })
      .then((result) => {
        sql.close(); // Close the connection pool
        resolve(result.recordset);
      })
      .catch((err) => {
        sql.close(); // Close the connection pool in case of an error
        reject(err);
      });
  });
}

// Example usage:
const queries = [
  "SELECT * FROM MobileNumber WHERE [Mobile Number] = '0553142429'",
];

const numQueries = 100;
const queryPromises = Array.from({ length: numQueries }, () =>
  executeQuery(queries[0])
);

queryPromises.forEach((promise, index) => {
  promise
    .then((result) => {
      console.log(`Query ${index} completed:`, result);
    })
    .catch((err) => {
      console.error(`Query ${index} failed:`, err);
    });
});
