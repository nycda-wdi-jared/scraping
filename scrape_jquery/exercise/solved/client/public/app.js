$(document).ready(function(){

	//remember this scrape route from the server side?
	$.ajax({
		method: 'GET',
		url: '/api/scrape'
	}).then(function(results){
		//console.log(results)
		var scrapedDiv = $('<div id="scraped-div">');

		//appending all of the information from the scrape to the client via jquery
		//look at the flow of the ui, all of that is here
		//look at all of the code and see how things are working on this page
		var itemDiv, scrapedTitle, scrapedImg, scrapedA;
		for(var i = 0; i < results.length; i++){
			itemDiv = $('<div class="item-div text-center center-block well">');
			itemDiv.css({margin: '5px', display: 'inline-block'})
			scrapedImg = $('<img>',{
				src: results[i]
			});
			scrapedA = $("<a>",{
				href: "http://pitchfork.com" + results[i].link,
				text: "Link",
				target: "_blank"
			})
			itemDiv.append(scrapedTitle).append(scrapedImg).append("<br>").append(scrapedA);
			scrapedDiv.append(itemDiv);
		}
		$('#scraped-stuff').append(scrapedDiv)
	});

});