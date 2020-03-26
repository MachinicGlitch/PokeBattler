const pokemon = require('./../classes/pokemon');
const types = require('./../classes/types');

module.exports = function(app){

  app.route('/pokemon')
    .get(pokemon.getPokemon)

  app.route('/types')
    .get(types.getTypes)

}
