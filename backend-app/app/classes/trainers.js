let connection = require('./../../Connection.js');


exports.getTrainers = function(req, res) {
  var sql = "SELECT * FROM Trainers"
  connection.query(sql, function (err, response, fields)
  {
    res.send(response);
  });
  connection.end;
}

exports.updateTrainerWins = function(req, res) {
  var sql = "UPDATE Trainers SET wins = wins + 1 WHERE trainer = ?";
  console.log("Incrementing " + req.body.trainer + "s wins");
  connection.query(sql, [req.body.trainer], function (err, res, fields) {
  });
  connection.end;
}