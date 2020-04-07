let connection = require('./../../Connection.js');

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

exports.getPokemon = function(req, res) {
  P.getPokemonByName(req.params.id)
    .then(function(response) {
      res.send(response)
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
}


exports.insertPokemon = function(req, res) {
  var sql = "INSERT INTO Battles (id, name, wins, losses, times_chosen, best_streak)"
    + " VALUES ( ?, ?, ?, ?, ?, ? )";
  console.log(req.body.name);
  console.log(req.body.id);
  connection.query(sql, [req.body.id, req.body.name, req.body.wins, req.body.losses, req.body.times_chosen, req.body.best_streak], function (err, res, fields) {
  });
}

exports.updatePokemonWins = function(req, res) {
  var sql = "UPDATE Battles SET wins = wins + 1 WHERE id = ?";
  console.log(req.body.type);
  connection.query(sql, [req.body.id], function (err, res, fields) {
  });
}

exports.updatePokemonLosses = function(req, res) {
  var sql = "UPDATE Battles SET losses = losses + 1 WHERE id = ?";
  console.log(req.body.type);
  connection.query(sql, [req.body.id], function (err, res, fields) {
  });
}

exports.updatePokemonTimesChosen = function(req, res) {
  var sql = "UPDATE Battles SET times_chosen = times_chosen + 1 WHERE id = ?";
  console.log(req.body.type);
  connection.query(sql, [req.body.id], function (err, res, fields) {
  });
}