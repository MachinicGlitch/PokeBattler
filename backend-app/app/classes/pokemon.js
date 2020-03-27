//let connection = require('./../../Connection.js');
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
