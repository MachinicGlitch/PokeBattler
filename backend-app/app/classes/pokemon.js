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


exports.updatePokemon = function(req, res) {
  var sql = "INSERT INTO Battles (id, name, wins, losses, times_chosen, best_streak)"
    + " VALUES ( ?, ?, ?, ?, ?, ? )";
  console.log(req.body.name);
  console.log(req.body.id);
  connection.query(sql, [req.body.id, req.body.name, req.body.wins, req.body.losses, req.body.times_chosen, req.body.best_streak], function (err, res, fields) {
  
  });
}