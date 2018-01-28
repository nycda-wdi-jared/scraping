var models = require('../models');
var express = require('express');
var path = require('path');
var cheerio = require('cheerio');
var request = require('request');

models.sequelize.sync();

var router = express.Router();

/*

	Set up your get to the home.handlebars
	You will be sending data through as well

*/

/*

	Set up your scrape route here
	This only needs to be ran once, and it should add to your table

*/

module.exports = router;