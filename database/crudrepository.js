// Require needed modules
require("dotenv").config();
const mysql = require("mysql");

// Create connection pool of max 10 connections
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "mydb.tamk.fi",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

// Group of database functions
let connectionFunctions = {
  /**
   * Function for finding all data from table
   *
   * @function findAll
   * @param {string} table
   * @returns {Promise<number> | Promise<object>}
   */
  findAll: (table) => {
    return new Promise((resolve, reject) => {
      let sqlQuery = "select * from ??";
      let insert = [table];

      // Prepare the sql query
      let preparedQuery = mysql.format(sqlQuery, insert);

      // Make the requested query
      pool.query(preparedQuery, (err, data) => {
        err ? reject(404) : resolve(data);
      });
    });
  },
  /**
   * Function for finding data by id from table
   *
   * @function findById
   * @param {string} table
   * @param {number} id
   * @returns {Promise<number> | Promise<boolean>}
   */
  findById: (table, id) => {
    return new Promise((resolve, reject) => {
      let sqlQuery = "select * from ?? where id = ?";
      let insert = [table, id];

      // Prepare the sql query
      let preparedQuery = mysql.format(sqlQuery, insert);

      // Make the requested query
      pool.query(preparedQuery, (err, data) => {
        data.length == 0 ? reject(404) : resolve(true);
      });
    });
  },
  /**
   * Function for saving given data to table
   *
   * @function save
   * @param {string} table
   * @param {object} data
   * @returns {Promise<number>}
   */
  save: (table, data) => {
    return new Promise((resolve, reject) => {
      let sqlQuery = "insert into ?? set ?";
      let insert = [table, data];

      // Prepare the sql query
      let preparedQuery = mysql.format(sqlQuery, insert);

      // Make the requested query
      pool.query(preparedQuery, (err, results) => {
        if (err) {
          reject(500);
        } else {
          resolve(201);
        }
      });
    });
  },
  /**
   * Function for updating existing data on table by id
   *
   * @function editById
   * @param {string} table
   * @param {object} data
   * @param {number} id
   * @returns {Promise<number>}
   */
  editById: (table, data, id) => {
    return new Promise((resolve, reject) => {
      let sqlQuery = "update ?? set ? where id = ?";
      let insert = [table, data, id];

      // Prepare the sql query
      let preparedQuery = mysql.format(sqlQuery, insert);

      // Make the requested query
      pool.query(preparedQuery, (err, results) => {
        if (err) {
          reject(500);
        } else {
          resolve(200);
        }
      });
    });
  },
  /**
   * Function for deleting data by its id
   *
   * @function deleteById
   * @param {string} table
   * @param {number} id
   * @returns {Promise<number>}
   */
  deleteById: (table, id) => {
    return new Promise((resolve, reject) => {
      let sqlQuery = "delete from ?? where id = ?";
      let insert = [table, id];

      // Prepare the sql query
      let preparedQuery = mysql.format(sqlQuery, insert);

      // Make the requested query
      pool.query(preparedQuery, (err, results) => {
        err ? reject(500) : resolve(204);
      });
    });
  },
};

module.exports = connectionFunctions;
