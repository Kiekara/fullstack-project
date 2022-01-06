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
};

module.exports = connectionFunctions;
