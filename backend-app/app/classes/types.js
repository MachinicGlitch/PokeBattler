//let connection = require('./../../Connection.js');


exports.getTypes = function(req, res) {
  // var query = "SELECT * FROM tech_talks";
  // connection.query(query, (err, results, fields) => {
  //   if(err)
  //     return console.error(err.message);

    res.send("types");
  //});
}
