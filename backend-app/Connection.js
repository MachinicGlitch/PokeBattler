// var mysql = require('mysql')

// /*
//  * Replaces all RDS Variables used previously. You will copy this verbatim as it works for
//  * all NodeJS apps. This may break when run locally
// */
// var vcap_services = JSON.parse(process.env.VCAP_SERVICES)

// //creating connection object
// var connection = mysql.createConnection({
//   host     : vcap_services["p.mysql"][0].credentials.hostname,
//   user     : vcap_services["p.mysql"][0].credentials.username,
//   password : vcap_services["p.mysql"][0].credentials.password,
//   port     : vcap_services["p.mysql"][0].credentials.port,
//   database : vcap_services["p.mysql"][0].credentials.name,
//   multipleStatements: true //used for running an sql file
// });
// var conn_succ = false; //checks connection status

// //connect to db
// connection.connect(function(err) {
//   if (err) {
//     conn_succ = false;
//     console.log('Not Connected to database.');
//     return;
//   }
//   conn_succ = true;
//   console.log('Connected to database.');
// });

// module.exports = connection;

var JAWSDB_URL = 'mysql://d7vm6xybyv5q10ke:qw549vexy5ucerih@zy4wtsaw3sjejnud.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ya2f30o1en2sad6n'
var mysql = require('mysql');
var connection = mysql.createConnection(JAWSDB_URL);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields){
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});

connection.end;