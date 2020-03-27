//let connection = require('./../../Connection.js');
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
