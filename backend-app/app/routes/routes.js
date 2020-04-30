const pokemon = require('./../classes/pokemon');
const types = require('./../classes/types');
const trainers = require('./../classes/trainers');
const battles = require('./../classes/battles');

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){
  
  // Pokemon 
  app.route('/pokemon/:id')
    .get(pokemon.getPokemon)


  // battles
  app.route('/battles')
    .get(urlencodedParser, battles.getBattles)

  app.route('/battles/top10BestStreaks')
    .get(urlencodedParser, battles.getTop10BestStreaks)

  app.route('/battles/insert')
    .post(urlencodedParser, battles.insertPokemon)

  app.route('/battles/updateWins')
    .post(urlencodedParser, battles.updatePokemonWins)

  app.route('/battles/updateLosses')
    .post(urlencodedParser, battles.updatePokemonLosses)

  app.route('/battles/updateTimesChosen')
    .post(urlencodedParser, battles.updatePokemonTimesChosen)

  app.route('/battles/updateBestStreak')
    .post(urlencodedParser, battles.updatePokemonBestStreak)


  // types
  app.route('/types/:type')
    .get(types.getType)

  app.route('/typeWins')
    .get(urlencodedParser, types.getTypeWins)

  app.route('/types/insert')
    .post(urlencodedParser, types.insertType)

  app.route('/types/updateWins')
    .post(urlencodedParser, types.updateTypeWins)

  app.route('/types/updateLosses')
    .post(urlencodedParser, types.updateTypeLosses)

  app.route('/types/updateTimesChosen')
    .post(urlencodedParser, types.updateTypeTimesChosen)


  // trainers
  app.route('/trainers')
    .get(urlencodedParser, trainers.getTrainers)

  app.route('/trainers/update')
    .post(urlencodedParser, trainers.updateTrainerWins)


}
