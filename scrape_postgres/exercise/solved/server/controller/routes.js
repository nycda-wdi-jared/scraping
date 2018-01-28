var models = require('../models');
var express = require('express');
var path = require('path');
var cheerio = require('cheerio');
var request = require('request');

models.sequelize.sync();

var router = express.Router();

router.get('/', function(req,res){
	models.Stat.findAll().then((stats) => {
		// var lessThanHundred = [];
		// var greaterThanHundred = [];
		// for(var i = 0; i < stats.length; i++){
		// 	if(stats[i].ppg < 100){
		// 		lessThanHundred.push(stats[i])
		// 	} else {
		// 		greaterThanHundred.push(stats[i])
		// 	}
		// }
		res.render('home', {stats: stats});
	});
});

//I only ran this once with postman, as this populates the database with the scraped data
router.get("/api/scrape", function(req,res){
	request('http://www.espn.com/nba/statistics/team/_/stat/team-comparison-per-game', function(err, response, html){
		if (err) {
			throw err
		}
		var $ = cheerio.load(html);
		var results = [];
		$('.tablehead').each(function(index, element){
			// console.log(element)
			// console.log($(this))
			// var table = $(element).find("table");
			// table.each(function(){
			var tr = $(this).find("tr");
			tr.each(function(){
				var team = $(this).find("td").eq(1).text().trim();
				var ppg = $(this).find("td").eq(2).text().trim();
				if(ppg.match(/[A-Za-z]/) == null){
					results.push({team: team, ppg: parseFloat(ppg)});
				}
			});
			// });
		});
		// models.Stat.bulkCreate(results)
		res.json(results)
	});
});

module.exports = router;