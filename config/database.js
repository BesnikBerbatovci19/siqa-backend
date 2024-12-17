const mysql = require("mysql2");
const dbConfig = {
  host: "127.0.0.1",
  port: 3306,
  database: "siqashop",
  user: "root",
  password: "",
  connectionLimit: 20,
  waitForConnections: true,
  queueLimit: 0,
  multipleStatements: true,
};
var pool;
var promisePool;
var dbConnection;
const dbCon = async ({ query, params }) => {
  // Check if pool is connected
  if (!pool) {
    pool = mysql.createPool(dbConfig);
    promisePool = pool.promise();
  }
  params = params || [];
  return await promisePool.query(query, params);
};

const getDbConnection = async () => {
  // Check if db is already connected
  if (dbConnection) return dbConnection;

  return new Promise((resolve, reject) => {
    const db = mysql.createConnection(dbConfig);
    db.connect((err) => {
      if (err) {
        console.error("Database connection failed: ", err);
        return reject(err); // Return rejection if there is an error
      }
      console.log("Connected to Main database");
      dbConnection = db;
      resolve(db); // Resolve the connection
    });
  });
};

const executeQuery = async ({ query, params }) => {
  const [rows, fields] = await dbCon({ query, params });
  return { status: true, data: rows };
};

module.exports = { dbCon, getDbConnection, executeQuery };
