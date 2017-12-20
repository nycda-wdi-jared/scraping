var express = require('express');
var path = require('path');
var request = require('request');

//cheerio is meant to use jquery on server side
var cheerio = require('cheerio');

var router = express.Router();

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

/*

	write the scrape route here

*/

module.exports = router;