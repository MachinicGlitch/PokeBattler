let connection = require('./../../Connection.js');


exports.getAllTalks = function(req, res) {
  var query = "SELECT * FROM tech_talks";
  connection.query(query, (err, results, fields) => {
    if(err)
      return console.error(err.message);

    res.send(results);
  });
}
