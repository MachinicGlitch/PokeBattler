const pokemon = require('./../classes/pokemon');
const types = require('./../classes/types');

module.exports = function(app){

  app.route('/pokemon/:id')
    .get(pokemon.getPokemon)

  app.route('/types/:type')
    .get(types.getType)

}
