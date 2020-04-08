let connection = require('./../../Connection.js');


exports.getTrainers = function(req, res) {
  var sql = "SELECT * FROM Trainers"
  connection.query(sql, function (err, response, fields)
  {
    res.send(response);
  });
}

exports.updateTrainerWins = function(req, res) {
  var sql = "UPDATE Trainers SET wins = wins + 1 WHERE trainer = ?";
  console.log(req.body.trainer);
  connection.query(sql, [req.body.trainer], function (err, res, fields) {
  });
}