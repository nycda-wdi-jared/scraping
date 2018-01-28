var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');

var routes = require('./controller/routes.js');
var handlebars_helpers = require('./helpers/handlebars_helpers.js');

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

//handlebars middleware
/*
	setting the directory where my views will be
	telling my application that i will be using handlebars
	handlebars_helpers, check out the helpers and then look for the 'inc' method in the code
*/
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	layoutsDir: 'client/public/views/layouts',
	helpers: handlebars_helpers
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname,'../client/public/views'));

app.use('/', routes);
app.use(express.static('./client'));

var PORT = process.env.PORT || 8000;

app.listen(PORT, function(){
	console.log("Listening on PORT " + PORT);
});