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
	var lng = '-73.984511';
	var lat = '40.7694445';
	var key = 'edfb819a19e630697ed7519902c209ee';
	var url = 'https://api.forecast.io/forecast/' + key + '/' + lat + ',' + lng;

	request(url, function(d) {
		res.writeHead(200, {"Content-Type": "application/json"});
		res.write(JSON.stringify(d));
		res.end();
	});
});

app.listen(port, function() {
  console.log('BlackMirror is running on http://localhost:' + port);
});