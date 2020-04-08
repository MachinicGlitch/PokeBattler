var JAWSDB_URL = 'mysql://d7vm6xybyv5q10ke:qw549vexy5ucerih@zy4wtsaw3sjejnud.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ya2f30o1en2sad6n'
var mysql = require('mysql');
var connection = mysql.createConnection(JAWSDB_URL);

connection.connect();

connection.query("SELECT * FROM Trainers", function(err, rows, fields){
    if (err) throw err;

    console.log('success');
});

module.exports = connection;

connection.end;

