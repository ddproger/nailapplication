var source = require('./db_connection');
var mysql = require('mysql');
exports.findAll = function (req, res) {
    var connection = source.getConnection();
    connection.connect(function(err) {
        if (err) res.send(err);
        connection.query("SELECT * FROM services", function (err, result) {
            if (err) res.send(err);
            source.closeConnection(connection);
            res.send(result);
          });
      });    
      return;
};
exports.findById = function (req, res) {
    var connection = source.getConnection();    
    var id = req.params.id;
    var sql = 'SELECT * FROM services WHERE id = ' + mysql.escape(id);
    connection.connect(function(err) {
        if (err) res.send(err);
        connection.query(sql, function (err, result) {
            if (err) res.send(err);
            source.closeConnection(connection);
            res.send(result);
          });
      });    
      return;
};
exports.add = function (req, res) {
    console.log(req.params.id);
    res.send("add");
}
exports.update = function (req, res) {
    var connection = source.getConnection();    
    var id = req.body.id;
    var name = req.body.name;
    var cost = req.body.cost;
    if(name==null||cost==null){
        res.status(400);
        res.send("");
        return;
    } 
    var sql;
    if(id!=null)
    sql = 'UPDATE services SET service_name='+mysql.escape(name)+',cost='+mysql.escape(cost)+' WHERE id='+mysql.escape(id);
    else
    sql = 'INSERT INTO services (service_name, cost) VALUES ('+mysql.escape(name)+', '+mysql.escape(cost)+')'
    connection.connect(function(err) {
        if (err) res.send(err);
        connection.query(sql, function (err, result) {
            if (err) res.send(err);
            source.closeConnection(connection);
            res.send(result);
          });
      });    
      return;
}
exports.delete = function (req, res) {
    var connection = source.getConnection();    
    var id = req.params.id;
    if(id==null){
        res.status(400);
        res.send("");
        return;
    } 
    var sql='DELETE FROM services WHERE id='+mysql.escape(id);
    connection.connect(function(err) {
        if (err) res.send(err);
        connection.query(sql, function (err, result) {
            if (err) res.send(err);
            source.closeConnection(connection);
            res.send(result);
          });
      });    
      return;
}