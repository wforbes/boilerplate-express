var express = require('express');
var app = express();
app.use('/public', express.static(__dirname + '/public'))

app.use(function(req, res, next) {
	var logString = req.method + ' ' + req.path + ' - ' + req.ip;
	console.log(logString);
	next();
});
	
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
	res.json({
		'message': (process.env.MESSAGE_STYLE === 'uppercase') ? 'HELLO JSON' : 'Hello json'
	});
});
	
app.get('/now', function(req, res, next) {
	req.time = new Date().toString();
	next();
}, function(req, res) {
	res.json({
		time: req.time
	});
});

app.get('/:word/echo', function (req, res) {
	res.json({ echo: req.params.word });
});

app.get('/name', (req, res) => {
	res.json({ name: req.query.first + ' ' + req.query.last });
});
// left off at https://www.freecodecamp.org/learn/apis-and-microservices/basic-node-and-express/get-query-parameter-input-from-the-client

































 module.exports = app;
