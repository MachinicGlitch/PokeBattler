let connection = require('./../../Connection.js');

// Pokedex acts as the connection to the PokeAPI
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

// Returns any pokemon given the proper id number
exports.getPokemon = function(req, res) {
  P.getPokemonByName(req.params.id)
    .then(function(response) {
      console.log("Retrieving Pokemon " + req.params.id + ": " + response.name);
      res.send(response)
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
      res.send(response)
    });
}

