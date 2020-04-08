let connection = require('./../../Connection.js');


exports.getTrainers = function(req, res) {
  var sql = "SELECT * FROM Trainers"
  connection.query(sql, function (err, response, fields)
  {
    res.send(response);
  });
}