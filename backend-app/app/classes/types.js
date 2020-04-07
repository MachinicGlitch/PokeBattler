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

exports.updateTypes = function(req, res) {
  var sql = "INSERT INTO Types (type, wins, losses, times_chosen)"
    + " VALUES ( ?, ?, ?, ? )";
  console.log(req.body.type);
  connection.query(sql, [req.body.type, req.body.wins, req.body.losses, req.body.times_chosen ], function (err, res, fields) {
  });
}