//dependencies
var express = require('express');
var bodyParser = require('body-parser');

//imported from the routes that you exported from routes.js
var routes = require('./controller/routes.js');

//express
var app = express();

//there is a lot that you can do with bodyParser as middleware
//it's a whole beautiful library of middleware meant to protect and help your application
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

//middleware that connects your imported routes to the routes of your application
app.use('/', routes);
//middleware that connects your static files(html,css,front end js)
app.use(express.static('./client'));

//you use this kind of route when pushing to heroku
var PORT = process.env.PORT || 8000;

//runs your server and has it listen on a port
app.listen(PORT, function(){
	console.log("Listening on PORT " + PORT);
});