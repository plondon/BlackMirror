var express = require('express');
var request = require('request');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by third party
var port = process.env.PORT || 8080;

// set the view engine to ejs but use html
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname);

// make express look in the root directory for assets (css/js/img)
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/weather', function(req, res) {
	// hard code for now
	var lng = '-73.984511';
	var lat = '40.7694445';
	var key = 'edfb819a19e630697ed7519902c209ee';
	var url = 'https://api.forecast.io/forecast/';

	url += key;
	url += '/';
	url += lat;
	url += ',';
	url += lng;

	request(url, function(err, d) {
		res.writeHead(200, {"Content-Type": "application/json"});
		res.write(JSON.stringify(d));
		res.end();
	});
});

app.get('/subway', function(req, res) {
	// hard code for now
	var mode = 'transit';
	var origin = 'Columbus_Circle';
	var dest = '159_West_25th_NewYork';
	var key = 'AIzaSyAJFm6N6BEzYHLsdKwapx_43Ez1sD1Igmk';
	var url = 'https://maps.googleapis.com/maps/api/directions/json';

	url += '?origin='+origin;
	url += '&destination='+dest;
  url += '&mode='+mode;
  url += '&key='+key;

  request(url, function(err, d) {
  	res.writeHead(200, {"Content-Type": "application/json"});
  	res.write(JSON.stringify(d));
  	res.end();
  });

});

app.get('/news', function(req, res) {
	var url = 'https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=news&rsz=8';

	request(url, function(err, d) {
		res.writeHead(200, {"Content-Type": "application/json"});
		res.write(JSON.stringify(d));
		res.end();
	});
});

app.get('/stocks', function(req, res) {
  var url = 'https://www.google.com/finance/info?infotype=infoquoteall&q=';
  var stocks = req.query.stocks.join();

  url += stocks;
  
  request(url, function(err, d) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(d));
    res.end();
  });
});

app.listen(port, function() {
  console.log('BlackMirror is running on http://localhost:' + port);
});
