/**
 * Database connection functions module
 * @module connectionFunctions
 */

/**
 * Dotenv module
 * @type {NodeModule}
 */
require("dotenv").config();
/**
 * Mysql module
 * @type {NodeModule}
 */
const mysql = require("mysql");

// Create connection pool of max 10 connections
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "mydb.tamk.fi",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

/**
 * Connection functions
 * @type {{
 *        findAll: (table: string)=>Promise,
 *        findById: (table: string, id: number)=>Promise,
 *        save: (table: string, data: {})=>Promise,
 *        editById: (table: string, data: {}, id: number)=>Promise,
 *        deleteById: (table: string, id: number)=>Promise}}
 */
let connectionFunctions = {
  /**
   * Function for finding all data from table
   * @param {string} table  Data table
   * @returns Promise       Result of the query
   */
  findAll: (table) => {
    return new Promise((resolve, reject) => {
      // Sql query to select all data from table
      let sqlQuery = "select * from ??";
      // Table name to insert to query
      let insert = [table];

      // Prepare sql query
      let preparedQuery = mysql.format(sqlQuery, insert);

      // Make the requested query
      pool.query(preparedQuery, (err, data) => {
        // Reject on error and resolve on success
        err ? reject(404) : resolve(data);
      });
    });
  },
  /**
   * Function for finding data by id from table
   * @param {string} table  Data table
   * @param {number} id     Data id
   * @returns Promise       Result of the query
   */
  findById: (table, id) => {
    return new Promise((resolve, reject) => {
      // Sql query to select all data from table at id
      let sqlQuery = "select * from ?? where id = ?";
      // Table name and data id to insert to query
      let insert = [table, id];
      // Prepare sql query
      let preparedQuery = mysql.format(sqlQuery, insert);

      // Make requested query
      pool.query(preparedQuery, (err, data) => {
        // Reject on error and resolve on success
        data.length == 0 ? reject(404) : resolve(true);
      });
    });
  },
  /**
   * Function for saving given data to table
   * @param {string} table  Data table
   * @param {{}} data       Data to save
   * @returns Promise       Result of the query
   */
  save: (table, data) => {
    return new Promise((resolve, reject) => {
      // Sql query to insert data set into table
      let sqlQuery = "insert into ?? set ?";
      // Table name and data set to insert to query
      let insert = [table, data];
      // Prepare sql query
      let preparedQuery = mysql.format(sqlQuery, insert);

      // Make requested query
      pool.query(preparedQuery, (err, results) => {
        // Reject on error and resolve on success
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
   * @param {string} table  Data table
   * @param {{}} data       Data to update
   * @param {number} id     Data id
   * @returns Promise       Result of the query
   */
  editById: (table, data, id) => {
    return new Promise((resolve, reject) => {
      // Sql query to update data set on specified id
      let sqlQuery = "update ?? set ? where id = ?";
      // Table name, data set and id to insert to query
      let insert = [table, data, id];
      // Prepare sql query
      let preparedQuery = mysql.format(sqlQuery, insert);

      // Make requested query
      pool.query(preparedQuery, (err, results) => {
        // Reject on error and resolve on success
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
   * @param {string} table  Data table
   * @param {number} id     Data id
   * @returns Promise       Result of the query
   */
  deleteById: (table, id) => {
    return new Promise((resolve, reject) => {
      // Sql query to delete data from table by id
      let sqlQuery = "delete from ?? where id = ?";
      // Table name and id to insert to query
      let insert = [table, id];
      // Prepare sql query
      let preparedQuery = mysql.format(sqlQuery, insert);

      // Make requested query
      pool.query(preparedQuery, (err, results) => {
        // Reject on error and resolve on success
        err ? reject(500) : resolve(204);
      });
    });
  },
};

/**
 * Export database connection functions module
 * @exports connectionFunctions
 */
module.exports = connectionFunctions;
