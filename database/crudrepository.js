require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

let connectionFunctions = {
  findAll: (table) => {
    return new Promise((resolve, reject) => {
      sqlQuery = "select * from ??";
      insert = [table];

      let preparedQuery = mysql.format(sqlQuery, insert);

      pool.query(preparedQuery, (err, data) => {
        err ? reject(404) : resolve(data);
      });
    });
  },
  save: (table, data) => {
    return new Promise((resolve, reject) => {
      let sqlQuery = "insert into ?? set ?";
      let insert = [table, data];
      let preparedQuery = mysql.format(sqlQuery, insert);

      pool.query(preparedQuery, (err, results) => {
        if (err) {
          reject(500);
        } else {
          resolve(201);
        }
      });
    });
  },
};

module.exports = connectionFunctions;
