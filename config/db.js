// Import the mysql2 library, which provides MySQL database functions
const mysql = require('mysql2');
const dotenv = require("dotenv");

// Load environment variables from a .env file, making sensitive information secure
dotenv.config();

/**
 * Creates a MySQL connection pool, using parameters defined in environment variables.
 * 
 * - host: Database host address (e.g., 'localhost' or an IP address).
 * - user: Database user with access privileges.
 * - password: Password for the database user.
 * - database: Name of the specific database to connect to.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

/**
 * Converts the pool's query methods to return promises.
 * 
 * This makes database queries more manageable by allowing the use of async/await syntax,
 * instead of relying on callback functions. It provides a cleaner, more readable structure
 * for handling asynchronous database queries.
 */
const promisePool = pool.promise();

/**
 * Exports the promisified pool, making it accessible across the application for executing 
 * SQL queries. Any module importing this file can use `promisePool` to interact with the 
 * MySQL database using async/await syntax.
 */
module.exports = promisePool;
