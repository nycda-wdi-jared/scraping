var request = require('request');
var cheerio = require('cheerio');

request('http://pitchfork.com/reviews/albums/', function(err, response, html){
	if (err) {
		throw err
	}

	var $ = cheerio.load(html);
	var results = [];
	$('.review').each(function(index, element){
		var title = $(element).find('h2').first().text();
		var image = $(element).find('img').first().attr('src');
		var link = $(element).find('a').first().attr('href');

		results.push({
			title: title,
			image: image,
			link: link
		});
		console.log(results)
	});
});