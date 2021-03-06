let connection = require('./../../Connection.js');


// Returns all data from the Battles table
exports.getBattles = function(req, res) {
  var sql = "SELECT * FROM Battles";
  connection.query(sql, function (err, response, fields)
  {
    res.send(response);
  });
  connection.end;
}

// Returns 10 pokemon with the highest best_streak
exports.getTop10BestStreaks = function(req, res) {
  var sql = "SELECT name, best_streak FROM Battles ORDER BY best_streak DESC LIMIT 10";
  connection.query(sql, function (err, response, fields)
  {
    res.send(response);
  });
  connection.end;
}

// Inserts a pokemon with stats into the Battles table
exports.insertPokemon = function(req, res) {
  var sql = "INSERT INTO Battles (id, name, wins, losses, times_chosen, best_streak)"
    + " VALUES ( ?, ?, ?, ?, ?, ? )";
  console.log("Inserting Pokemon: " + req.body.name + " with id " + req.body.id);
  connection.query(sql, [req.body.id, req.body.name, req.body.wins, req.body.losses, req.body.times_chosen, req.body.best_streak], function (err, response, fields) {
    res.send(response);
  });
  connection.end;
}

// Increments a given pokemon's wins, and current_streak by one
exports.updatePokemonWins = function(req, res) {
  var sql = "UPDATE Battles SET wins = wins + 1, current_streak = current_streak + 1 WHERE id = ?";
  console.log("Incrementing " + req.body.side + " " + req.body.name + "'s wins and current streak");
  connection.query(sql, [req.body.id], function (err, response, fields) {
    res.send(response);
  });
  connection.end;
}

// Checks if a pokemon's current_streak is higher than its best_streak, if so it updates best_streak
exports.updatePokemonBestStreak = function(req, res) {
  var sql = "UPDATE Battles SET best_streak = current_streak WHERE id = ? AND current_streak > best_streak";
  console.log("Checking " + req.body.name + "'s best streak...");
  connection.query(sql, [req.body.id], function (err, response, fields) {
    res.send(response);
  });
  connection.end;
}

// Increments pokemon's losses and resets its current_streak to 0
exports.updatePokemonLosses = function(req, res) {
  var sql = "UPDATE Battles SET losses = losses + 1, current_streak = 0 WHERE id = ?";
  console.log("Incrementing " + req.body.side + " " + req.body.name + "'s losses and resetting streak");
  connection.query(sql, [req.body.id], function (err, response, fields) {
    res.send(response);
  });
  connection.end;
}

// Increments a pokemon's times_chosen
exports.updatePokemonTimesChosen = function(req, res) {
  var sql = "UPDATE Battles SET times_chosen = times_chosen + 1 WHERE id = ?";
  console.log("Incrementing " + req.body.name + "'s times chosen");
  connection.query(sql, [req.body.id], function (err, response, fields) {
    res.send(response);
  });
  connection.end;
}
