var express = require('express');
var app = express();
app.use("/public", express.static(__dirname + '/public'))
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
		// check if /now route has a middleware before the handler
		// var stack = (myApp.parent._router && myApp.parent._router.stack) || [];
		// var nowRoute = stack.filter((l) => {
		// 	if (l.route) {
		// 		return l.route.path === '/now';
		// 	}
		// 	return false;
		// });
		// myApp._router = myApp.parent._router;
		res.json({
			time: req.time
		});
	});



































 module.exports = app;
