let connection = require('./../../Connection.js');

  
  exports.getBattles = function(req, res) {
    var sql = "SELECT * FROM Battles";
    connection.query(sql, function (err, response, fields)
    {
      res.send(response);
    });
    connection.end;
  }

  exports.getTop10BestStreaks = function(req, res) {
    var sql = "SELECT name, best_streak FROM Battles ORDER BY best_streak DESC LIMIT 10";
    connection.query(sql, function (err, response, fields)
    {
      res.send(response);
    });
    connection.end;
  }


  exports.insertPokemon = function(req, res) {
    var sql = "INSERT INTO Battles (id, name, wins, losses, times_chosen, best_streak)"
      + " VALUES ( ?, ?, ?, ?, ?, ? )";
    console.log("Inserting Pokemon: " + req.body.name + " with id " + req.body.id);
    connection.query(sql, [req.body.id, req.body.name, req.body.wins, req.body.losses, req.body.times_chosen, req.body.best_streak], function (err, res, fields) {
    });
    connection.end;
  }
  
  exports.updatePokemonWins = function(req, res) {
    var sql = "UPDATE Battles SET wins = wins + 1 WHERE id = ?";
    console.log("Incrementing " + req.body.type + "s wins");
    connection.query(sql, [req.body.id], function (err, res, fields) {
    });
    connection.end;
  }
  
  exports.updatePokemonLosses = function(req, res) {
    var sql = "UPDATE Battles SET losses = losses + 1 WHERE id = ?";
    console.log("Incrementing " + req.body.type + "s losses");
    connection.query(sql, [req.body.id], function (err, res, fields) {
    });
    connection.end;
  }
  
  exports.updatePokemonTimesChosen = function(req, res) {
    var sql = "UPDATE Battles SET times_chosen = times_chosen + 1 WHERE id = ?";
    console.log("Incrementing " + req.body.type + "s times chosen");
    connection.query(sql, [req.body.id], function (err, res, fields) {
    });
    connection.end;
  }
