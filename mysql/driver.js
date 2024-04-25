const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "russells-movie",
// });
const connection = mysql.createConnection({
  host: "russell-movie-database.uk",
  user: "russellm_russells-movie-database",
  password: "Qio8G((mpceq",
  database: "russellm_russells-movie-database",
});

connection.connect();

function asyncMySQL(query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(results);
    });
  });
}

module.exports = asyncMySQL;
