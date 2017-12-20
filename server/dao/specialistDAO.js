var source = require('./db_connection');
var mysql = require('mysql');
exports.findAll = function (req, res) {
    var connection = source.getConnection();
    connection.connect(function(err) {
        if (err) res.send(err);
        connection.query("SELECT * FROM specialists", function (err, result) {
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
    var sql = 'SELECT * FROM specialists WHERE id = ' + mysql.escape(id);
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
exports.update = function (req, res) {
    var connection = source.getConnection();    
    var id = req.body.id;
    var name = req.body.name;
    var address = req.body.address;
    var tel = req.body.tel;
    var photo = req.body.photo;
    if(name==null||address==null||tel==null||photo==null){
        res.status(400);
        res.send("");
        return;
    } 
    var sql;
    if(id!=null)
    sql = 'UPDATE specialists SET spec_name='+mysql.escape(name)+
    ', `address`='+mysql.escape(address)+
    ', `telephone`='+mysql.escape(tel)+
    ', `photo`='+mysql.escape(photo)+
    ' WHERE `id`='+mysql.escape(id)+';';
    else
    sql = 'INSERT INTO specialists (spec_name, address, telephone, photo) VALUES ('
    +mysql.escape(name)+', '
    +mysql.escape(address)+', '
    +mysql.escape(tel)+', '
    +mysql.escape(photo)+');'

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
    var sql='DELETE FROM specialists WHERE id='+mysql.escape(id);
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
exports.findFromService = function (req, res) {
    var connection = source.getConnection();    
    var id = req.params.id;
    if(id==null){
        res.status(400);
        res.send("");
        return;
    } 
    var sql='SELECT specialists.id as id, '+
    'specialists.spec_name as spec_name, '+
    'specialists.address as address, '+
    'specialists.telephone as telephone, '+
    'specialists.photo as photo '+
    'FROM service_has_specialist as shs '+
    'join specialists '+
    'on shs.specialist_id = specialists.id '+
    'where shs.service_id='+mysql.escape(id);
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