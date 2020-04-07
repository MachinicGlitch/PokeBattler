const express = require('express');
const cors = require('cors');
const app = express();

var port = process.env.PORT || 3306;

var connection = require("./Connection");

var corsOptions ={
  origin: '*',
  methods: 'GET,HEAD,POST,OPTIONS,DELETE',
  "preflightContinue": true
}

app.use(express.json());
app.use(cors(corsOptions))


var routes = require('./app/routes/routes');

routes(app);


app.listen(port, (err)=>{
  if (err) {
    return console.log('ERROR: ', err);
  }
    console.log("The server is live on port: " + port);
});
