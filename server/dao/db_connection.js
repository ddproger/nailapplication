var mysql = require('mysql');

exports.getConnection = function(){
  return mysql.createConnection({
    host: "localhost",
    database: "naildb",
    user: "root",
    password: "qwerty"
  });
}
exports.closeConnection=function(connection){
  connection.end(function(err) {
    if (err) {
      return console.log('error:' + err.message);
    }
  });
}