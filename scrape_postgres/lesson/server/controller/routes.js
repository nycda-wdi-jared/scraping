var models = require('../models');
var express = require('express');
var path = require('path');
var cheerio = require('cheerio');
var request = require('request');

models.sequelize.sync();

var router = express.Router();

router.get('/', function(req,res){
	models.Stat.findAll().then((stats) => {
		res.render('home', {stats: stats});
	});
});

//I only ran this once with postman, as this populates the database with the scraped data
router.get("/api/scrape", function(req,res){
	request('http://www.nfl.com/stats/categorystats?archive=false&conference=null&role=TM&offensiveStatisticCategory=TOTAL_YARDS&defensiveStatisticCategory=null&season=2017&seasonType=REG&tabSeq=2&qualified=false&Submit=Go', function(err, response, html){
		if (err) {
			throw err
		}
		var $ = cheerio.load(html);
		var results = [];
		$('#result').each(function(){
			var tr = $(this).find("tr");
			tr.each(function(){
				var teamName = $(this).find("td").eq(1).text().trim();
				var turnoverRatio = $(this).find("td").eq(20).text().trim();
				if(teamName !== ""){
					results.push({team: teamName, tor: turnoverRatio});
				}
			});
		});
		models.Stat.bulkCreate(results)
	});
});

module.exports = router;