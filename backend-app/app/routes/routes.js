const pokemon = require('./../classes/pokemon');
const types = require('./../classes/types');

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){
  
  app.route('/pokemon/:id')
    .get(pokemon.getPokemon)

  app.route('/pokemon/update')
    .post(urlencodedParser, pokemon.updatePokemon)

  app.route('/types/:type')
    .get(types.getType)

  app.route('/types/update')
    .post(urlencodedParser, types.updateTypes)
}
