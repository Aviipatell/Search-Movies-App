var express = require('express');
var app = express();
var request = require('request');
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("search");
});


app.get("/results", function(req, res){
	var query = req.query.movieSearch;
	var url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
	//res.send("Hello, it works!");
	request(url, function(error, response, body){
		if (!error && response.statusCode == 200){
			var parsedData = JSON.parse(body);
			//res.send(parsedData.Search[0].Title);
			res.render("results", {parsedData: parsedData});
		}
	})
});



app.get("*", function(req, res){
	res.send("Page not found!");
});



app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Movie App has started..");
})