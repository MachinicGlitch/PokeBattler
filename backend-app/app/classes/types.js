let connection = require('./../../Connection.js');
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

exports.getType = function(req, res) {
  P.getTypeByName(req.params.type)
    .then(function(response) {
      res.send(response)
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
}

exports.insertType = function(req, res) {
  var sql = "INSERT INTO Types (type, wins, losses, times_chosen)"
    + " VALUES ( ?, ?, ?, ? )";
  console.log(req.body.type);
  connection.query(sql, [req.body.type, req.body.wins, req.body.losses, req.body.times_chosen ], function (err, res, fields) {
  });
}

exports.updateTypeWins = function(req, res) {
  var sql = "UPDATE Types SET wins = wins + 1 WHERE id = ?";
  console.log(req.body.type);
  connection.query(sql, [req.body.id], function (err, res, fields) {
  });
}

exports.updateTypeLosses = function(req, res) {
  var sql = "UPDATE Types SET losses = losses + 1 WHERE id = ?";
  console.log(req.body.type);
  connection.query(sql, [req.body.id], function (err, res, fields) {
  });
}

exports.updateTypeTimesChosen = function(req, res) {
  var sql = "UPDATE Types SET times_chosen = times_chosen + 1 WHERE id = ?";
  console.log(req.body.type);
  connection.query(sql, [req.body.id], function (err, res, fields) {
  });
}