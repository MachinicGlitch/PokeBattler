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

exports.getTypeWins = function(req, res) {
  var sql = "SELECT * FROM Types Order By wins DESC";
  connection.query(sql, function (err, response, fields)
  {
    res.send(response);
  });
  connection.end;
}


exports.insertType = function(req, res) {
  var sql = "INSERT INTO Types (type, wins, losses, times_chosen)"
    + " VALUES ( ?, ?, ?, ? )";
  console.log("Inserting type " + req.body.type);
  connection.query(sql, [req.body.type, req.body.wins, req.body.losses, req.body.times_chosen ], function (err, response, fields) {
    res.send(response);
  });
  connection.end;
}

exports.updateTypeWins = function(req, res) {
  var sql = "UPDATE Types SET wins = wins + 1 WHERE type = ?";
  console.log("Incrementing " + req.body.side + " " + req.body.type + "'s wins");
  connection.query(sql, [req.body.type], function (err, response, fields) {
    res.send(response);
  });
  connection.end;
}

exports.updateTypeLosses = function(req, res) {
  var sql = "UPDATE Types SET losses = losses + 1 WHERE type = ?";
  console.log("Incrementing " + req.body.side + " " + req.body.type + "'s losses");
  connection.query(sql, [req.body.type], function (err, response, fields) {
    res.send(response);
  });
  connection.end;
}

exports.updateTypeTimesChosen = function(req, res) {
  var sql = "UPDATE Types SET times_chosen = times_chosen + 1 WHERE type = ?";
  console.log("Incrementing " + req.body.type + " (" +req.body.name + ") times chosen");
  connection.query(sql, [req.body.type], function (err, response, fields) {
    res.send(response);
  });
  connection.end;
}

