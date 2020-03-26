const users = require('./../classes/pokemon');
const talks = require('./../classes/types');

module.exports = function(app){

  app.route('/pokemon')
    .get(users.getAllUsers)

  app.route('/types')
    .get(talks.getAllTalks)

}
