var express = require('express');
var app = express();
app.use("/public", express.static(__dirname + '/public'))
	.use(function(req, res, next) {
		var logString = req.method + " " + req.path + " - " + req.ip;
		console.log(logString);
		next();
	})
	.get("/", function(req, res) {
		res.sendFile(__dirname + "/views/index.html");
	})
	.get("/json", function(req, res) {
		res.json({
			"message": (process.env.MESSAGE_STYLE === 'uppercase') ? "HELLO JSON" : "Hello json"
		});
	})
	.get("/now", function(req, res, next) {
		req.time = new Date().toString();
		next();
	}, function(req, res) {
		res.json({
			time: req.time
		});
	})
	.get("/:word/echo", function (req, res) {
		res.json({ echo: req.params.word });
	});



































 module.exports = app;
