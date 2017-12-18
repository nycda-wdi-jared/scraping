var request = require('request');

//cheerio is meant to use jquery on server side
var cheerio = require('cheerio');

//check out the url in there before you do anything
request('http://pitchfork.com/reviews/albums/', function(err, response, html){
	if (err) {
		throw err
	}
	//console.log("--response--")
	//console.log(response)
	//console.log("--html--")
	//console.log(html)

	//you are able to query through the html of the request route using cheerio
	//look for the 'review' class in the urls html (google inspect)
	//.each is looping through all the 'review' classes and finding the first h2, img, & a tag within the class
	//then i am merely adding that information to an array
	var $ = cheerio.load(html);
	var results = [];
	$('.review').each(function(index, element){
		//console.log(index)
		//console.log(element)
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