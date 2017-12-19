var source = require('./db_connection');

exports.findAll = function (req, res, next) {
    source.getConnection().connect(function(err) {
        if (err) throw err;
        source.getConnection().query("SELECT * FROM services", function (err, result) {
            if (err) throw err;
            res.send(result);
          });
      });    
};