var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  database: "naildb",
  user: "root",
  password: "qwerty"
});
exports.getConnection = function(){
  return con;
}