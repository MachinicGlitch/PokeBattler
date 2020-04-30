let connection = require("./../../Connection.js");


// Returns all data from the Trainers table
exports.getTrainers = function (req, res) {
  var sql = "SELECT * FROM Trainers";
  connection.query(sql, function (err, response, fields) {
    res.send(response);
  });
  connection.end;
};

// Increments the given trainers wins by 1
exports.updateTrainerWins = function (req, res) {
  var sql = "UPDATE Trainers SET wins = wins + 1 WHERE trainer = ?";
  console.log("Incrementing " + req.body.trainer + "'s wins");
  connection.query(sql, [req.body.trainer], function (err, response, fields) {
    res.send(response);
  });
  connection.end;
};
