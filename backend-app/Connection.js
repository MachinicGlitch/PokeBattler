var JAWSDB_URL = process.env.JAWSDB_URL
var mysql = require('mysql');

var connection = mysql.createConnection(JAWSDB_URL);
connection.connect();

connection.query("SELECT * FROM Trainers", function(err, rows, fields){
    if (err) throw err;

    console.log('success');
});

module.exports = connection;

connection.end;
