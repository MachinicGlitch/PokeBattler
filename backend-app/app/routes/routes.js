const pokemon = require('./../classes/pokemon');
const types = require('./../classes/types');

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){
  
  app.route('/pokemon/:id')
    .get(pokemon.getPokemon)

  app.route('/pokemon/insert')
    .post(urlencodedParser, pokemon.insertPokemon)

  app.route('/pokemon/updateWins')
    .post(urlencodedParser, pokemon.updatePokemonWins)

  app.route('/pokemon/updateLosses')
    .post(urlencodedParser, pokemon.updatePokemonLosses)

  app.route('/pokemon/updateTimesChosen')
    .post(urlencodedParser, pokemon.updatePokemonTimesChosen)



  app.route('/types/:type')
    .get(types.getType)

  app.route('/types/insert')
    .post(urlencodedParser, types.insertType)

  app.route('/types/updateWins')
    .post(urlencodedParser, types.updateTypeWins)

  app.route('/types/updateLosses')
    .post(urlencodedParser, types.updateTypeLosses)

  app.route('/types/updateTimesChosen')
    .post(urlencodedParser, types.updateTypeTimesChosen)

}
